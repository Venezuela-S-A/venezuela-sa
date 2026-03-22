import { visit } from 'unist-util-visit';
import crypto from 'crypto';

/**
 * Remark plugin that replaces mermaid code blocks with static SVG image references.
 * SVGs are pre-rendered by scripts/build-mermaid.js at build time.
 */
export function remarkMermaidStatic() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid') return;

      const hash = crypto.createHash('md5').update(node.value).digest('hex');
      const firstLine = node.value.trim().split('\n')[0].toLowerCase();
      const lineCount = node.value.trim().split('\n').length;

      // Detect diagram type from first line
      let type = 'other';
      if (/^(flowchart|graph)\b/.test(firstLine)) type = 'flowchart';
      else if (/^xychart-beta\b/.test(firstLine)) type = 'xychart';
      else if (/^gantt\b/.test(firstLine)) type = 'gantt';
      else if (/^pie\b/.test(firstLine)) type = 'pie';

      // Determine complexity: pie and small flowcharts are simple
      const complexity = (type === 'pie' || (type === 'flowchart' && lineCount < 10))
        ? 'simple'
        : 'complex';

      const html = {
        type: 'html',
        value: `<figure class="vsa-diagram" data-diagram-type="${type}" data-complexity="${complexity}"><img src="/diagrams/${hash}.svg" alt="Diagrama" loading="lazy" /><figcaption class="vsa-diagram__caption"></figcaption></figure>`,
      };

      parent.children.splice(index, 1, html);
    });
  };
}
