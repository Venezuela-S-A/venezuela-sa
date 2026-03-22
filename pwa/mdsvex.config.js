import { remarkMermaidStatic } from './src/plugins/remark-mermaid-static.js';
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from '@microflash/remark-callout-directives';
import { remarkSourceBadges } from './src/plugins/remark-source-badges.js';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeParagraphIds } from './src/plugins/rehype-paragraph-ids.js';
import { rehypeTableWrapper } from './src/plugins/rehype-table-wrapper.js';

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
  extensions: ['.md'],
  remarkPlugins: [
    remarkMermaidStatic,
    remarkDirective,
    [remarkCalloutDirectives, {
      aliases: {
        danger: 'deter',
        info: 'note',
        tip: 'commend',
        caution: 'deter',
        warning: 'warn',
      },
    }],
    remarkSourceBadges,
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    rehypeParagraphIds,
    rehypeTableWrapper,
  ],
  smartypants: {
    dashes: 'oldschool',
  },
};

export default config;
