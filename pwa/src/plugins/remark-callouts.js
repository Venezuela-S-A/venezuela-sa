import { visit } from "unist-util-visit";

/**
 * Remark plugin that transforms Docusaurus-style callout blocks into
 * proper HTML aside elements with callout classes.
 *
 * mdsvex uses its own internal parser that doesn't support remark-directive's
 * micromark extensions. Container directives (:::type) are parsed as plain
 * text within paragraph nodes.
 *
 * Handles multiple cases:
 * 1. Single-paragraph: all content fits in one paragraph node
 * 2. Multi-node with closing in paragraph: tables/lists between opening and closing
 * 3. Multi-node with closing embedded in list/table: closing ::: inside last list item
 */

const ALIASES = {
  danger: "deter",
  info: "note",
  tip: "commend",
  caution: "warn",
  warning: "warn",
  deter: "deter",
  note: "note",
  commend: "commend",
  warn: "warn",
};

const CALLOUT_TITLES = {
  deter: "Danger",
  note: "Note",
  commend: "Success",
  warn: "Warning",
};

const CALLOUT_ICONS = {
  deter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true"><path d="M12 12s-5.6 4.6-3.6 8c1.6 2.6 5.7 2.7 7.2 0 2-3.7-3.6-8-3.6-8Z"/><path d="M13.004 2 8.5 9 6.001 6s-4.268 7.206-1.629 11.8c3.016 5.5 11.964 5.7 15.08 0C23.876 10 13.004 2 13.004 2Z"/></svg>`,
  note: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true"><path d="M12 8h.01M12 12v4"/><circle cx="12" cy="12" r="10"/></svg>`,
  commend: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true"><path d="m8 12 2.7 2.7L16 9.3"/><circle cx="12" cy="12" r="10"/></svg>`,
  warn: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"/></svg>`,
};

const DIRECTIVE_TYPES_PATTERN = Object.keys(ALIASES).join("|");
const OPENING_RE = new RegExp(`^:::(?:${DIRECTIVE_TYPES_PATTERN})(?:\\s|$)`, "i");

/**
 * Serialize inline MDAST nodes to HTML string.
 */
function serializeInline(children) {
  let result = "";
  for (const child of children) {
    switch (child.type) {
      case "text":
        result += child.value;
        break;
      case "strong":
        result += `<strong>${serializeInline(child.children)}</strong>`;
        break;
      case "emphasis":
        result += `<em>${serializeInline(child.children)}</em>`;
        break;
      case "link":
        result += `<a href="${child.url}">${serializeInline(child.children)}</a>`;
        break;
      case "inlineCode":
        result += `<code>${child.value}</code>`;
        break;
      case "html":
        result += child.value;
        break;
      case "break":
        result += "<br/>";
        break;
      default:
        if (child.children) result += serializeInline(child.children);
        else if (child.value) result += child.value;
    }
  }
  return result;
}

/**
 * Serialize a block-level MDAST node to HTML.
 */
function serializeBlock(node) {
  switch (node.type) {
    case "paragraph":
      return `<p>${serializeInline(node.children)}</p>`;
    case "heading": {
      const level = node.depth || 2;
      return `<h${level}>${serializeInline(node.children)}</h${level}>`;
    }
    case "table":
      return serializeTable(node);
    case "list":
      return serializeList(node);
    case "blockquote":
      return `<blockquote>${node.children.map(serializeBlock).join("")}</blockquote>`;
    case "code":
      return `<pre><code>${escapeHtml(node.value)}</code></pre>`;
    case "html":
      return node.value;
    case "thematicBreak":
      return "<hr/>";
    default:
      if (node.children) return node.children.map(serializeBlock).join("");
      if (node.value) return `<p>${node.value}</p>`;
      return "";
  }
}

function serializeTable(node) {
  let html = "<table>";
  const [head, ...body] = node.children;
  if (head) {
    html += "<thead><tr>";
    for (const cell of head.children) {
      html += `<th>${serializeInline(cell.children)}</th>`;
    }
    html += "</tr></thead>";
  }
  if (body.length) {
    html += "<tbody>";
    for (const row of body) {
      html += "<tr>";
      for (const cell of row.children) {
        html += `<td>${serializeInline(cell.children)}</td>`;
      }
      html += "</tr>";
    }
    html += "</tbody>";
  }
  html += "</table>";
  return html;
}

function serializeList(node) {
  const tag = node.ordered ? "ol" : "ul";
  let html = `<${tag}>`;
  for (const item of node.children) {
    html += `<li>${item.children.map(serializeBlock).join("")}</li>`;
  }
  html += `</${tag}>`;
  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Extract plain text from any node tree.
 */
function extractPlainText(children) {
  let result = "";
  for (const child of children) {
    if (child.value !== undefined) result += child.value;
    else if (child.children) result += extractPlainText(child.children);
  }
  return result;
}

/**
 * Recursively check if a node tree contains the closing ::: marker.
 * Returns true if found, and strips it from the text node where found.
 */
function findAndStripClosing(node) {
  if (node.type === "text" && node.value) {
    const trimmed = node.value.trimEnd();
    if (trimmed.endsWith(":::")) {
      // Strip the closing :::
      node.value = trimmed.slice(0, -3).trimEnd();
      return true;
    }
  }
  if (node.children) {
    // Check children in reverse (closing is at the end)
    for (let i = node.children.length - 1; i >= 0; i--) {
      if (findAndStripClosing(node.children[i])) return true;
    }
  }
  return false;
}

/**
 * Check if a node tree contains the closing ::: marker (without modifying).
 */
function containsClosing(node) {
  if (node.type === "text" && node.value) {
    if (node.value.trimEnd().endsWith(":::")) return true;
  }
  if (node.children) {
    for (let i = node.children.length - 1; i >= 0; i--) {
      if (containsClosing(node.children[i])) return true;
    }
  }
  return false;
}

function buildCallout(calloutType, title, bodyHtml) {
  const icon = CALLOUT_ICONS[calloutType] || "";
  return `<aside class="callout callout-${calloutType}"><div class="callout-indicator"><div class="callout-hint">${icon}</div><div class="callout-title">${title}</div></div><div class="callout-content">${bodyHtml}</div></aside>`;
}

function parseOpening(text) {
  const match = text.match(/^:::(\w+)(?:\s+(.+))?$/);
  if (!match) return null;
  const rawType = match[1].toLowerCase();
  const calloutType = ALIASES[rawType];
  if (!calloutType) return null;
  return {
    calloutType,
    title: match[2] || CALLOUT_TITLES[calloutType] || "Note",
  };
}

export function remarkCallouts() {
  return (tree) => {
    const children = tree.children;

    for (let i = children.length - 1; i >= 0; i--) {
      const node = children[i];
      if (node.type !== "paragraph" || !node.children?.length) continue;

      const firstChild = node.children[0];
      if (firstChild.type !== "text" || !firstChild.value.startsWith(":::")) continue;

      const plainText = extractPlainText(node.children);
      if (!OPENING_RE.test(plainText)) continue;

      const firstLine = plainText.split("\n")[0];
      const parsed = parseOpening(firstLine);
      if (!parsed) continue;

      // CASE 1: Single-paragraph callout (opening + body + closing all in one)
      if (plainText.trimEnd().endsWith(":::") && plainText.indexOf(":::") !== plainText.lastIndexOf(":::")) {
        const serialized = serializeInline(node.children);
        const lines = serialized.split("\n");
        const bodyLines = lines.slice(1, -1);
        let body = bodyLines.join("\n").trim();

        if (body && !body.startsWith("<")) {
          body = body
            .split(/\n\n+/)
            .map((p) => `<p>${p.replace(/\n/g, " ")}</p>`)
            .join("");
        }

        children[i] = {
          type: "html",
          value: buildCallout(parsed.calloutType, parsed.title, body),
        };
        continue;
      }

      // CASE 2+3: Multi-node spanning callout
      // Find the closing ::: in any subsequent sibling node
      let closingIndex = -1;
      for (let j = i + 1; j < children.length && j < i + 50; j++) {
        if (containsClosing(children[j])) {
          closingIndex = j;
          break;
        }
      }

      if (closingIndex === -1) continue;

      // Strip the closing ::: from wherever it is
      findAndStripClosing(children[closingIndex]);

      // Collect body content
      const bodyParts = [];

      // Remaining content from opening paragraph (after first line)
      const openingSerialized = serializeInline(node.children);
      const openingLines = openingSerialized.split("\n");
      if (openingLines.length > 1) {
        const remainingText = openingLines.slice(1).join("\n").trim();
        if (remainingText) {
          bodyParts.push(`<p>${remainingText}</p>`);
        }
      }

      // Nodes between opening and closing (inclusive of closing node)
      for (let j = i + 1; j <= closingIndex; j++) {
        bodyParts.push(serializeBlock(children[j]));
      }

      const bodyHtml = bodyParts.join("");

      // Replace the range [i..closingIndex] with a single HTML node
      children.splice(i, closingIndex - i + 1, {
        type: "html",
        value: buildCallout(parsed.calloutType, parsed.title, bodyHtml),
      });
    }
  };
}
