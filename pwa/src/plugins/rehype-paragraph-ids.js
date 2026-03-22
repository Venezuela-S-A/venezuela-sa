import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that adds sequential paragraph IDs (p-0, p-1, ...) to each
 * <p> element in the document. This enables deep linking and paragraph-level
 * social features (Phase 4).
 *
 * Skips paragraphs inside callout/admonition containers to avoid conflicts
 * with the callout directives plugin.
 */
export function rehypeParagraphIds() {
  return (tree) => {
    let counter = 0;

    visit(tree, 'element', (node, _index, parent) => {
      if (node.tagName !== 'p') return;

      // Skip paragraphs inside admonition containers
      if (parent && parent.type === 'element') {
        const parentClasses = parent.properties?.className || [];
        if (Array.isArray(parentClasses) && parentClasses.some(c =>
          typeof c === 'string' && (c.includes('callout') || c.includes('admonition'))
        )) {
          return;
        }
      }

      node.properties = node.properties || {};
      node.properties.id = `p-${counter++}`;
    });
  };
}
