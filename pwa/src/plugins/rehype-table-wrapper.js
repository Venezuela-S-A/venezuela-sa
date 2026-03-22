import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that wraps <table> elements in a scrollable container div.
 * Enables horizontal scrolling on mobile for wide tables.
 *
 * Per D-19: Tables preceded by an HTML comment <!-- star-table --> get
 * the vsa-star-table class (elevated card with accent border).
 * All others get vsa-table-wrapper (standard scrollable container).
 */
export function rehypeTableWrapper() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table') return;
      if (!parent || typeof index !== 'number') return;

      // Check if preceded by a star-table comment
      let isStarTable = false;
      if (index > 0) {
        const prev = parent.children[index - 1];
        if (prev && prev.type === 'comment' && prev.value?.trim() === 'star-table') {
          isStarTable = true;
        }
        // Also check for raw HTML comment node
        if (prev && prev.type === 'raw' && prev.value?.includes('<!-- star-table -->')) {
          isStarTable = true;
        }
      }

      const wrapperClass = isStarTable ? 'vsa-star-table' : 'vsa-table-wrapper';

      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: [wrapperClass],
          role: 'region',
          ariaLabel: 'Tabla con scroll horizontal',
          tabIndex: 0,
        },
        children: [node],
      };

      parent.children.splice(index, 1, wrapper);
    });
  };
}
