import { visit } from "unist-util-visit";

/**
 * Remark plugin that escapes ALL `<` characters in text nodes.
 *
 * In the remark AST, text nodes never contain actual HTML tags — those are
 * parsed into separate `html` or element nodes. So any `<` remaining in a
 * text node is a literal less-than sign (e.g., `<40%`, `< 30%`, `<USD 0.02`).
 *
 * mdsvex/Svelte interprets bare `<` as HTML/component tags, causing build
 * failures. Escaping them as `&lt;` prevents this while preserving display.
 *
 * Runs first in the remark pipeline, before any other processing.
 */
export function remarkEscapeAngles() {
  return (tree) => {
    visit(tree, "text", (node) => {
      if (node.value.includes("<")) {
        node.value = node.value.replace(/</g, "&lt;");
      }
    });
  };
}
