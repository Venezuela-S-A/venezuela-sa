import { remarkEscapeAngles } from "./src/plugins/remark-escape-angles.js";
import { remarkMermaidStatic } from "./src/plugins/remark-mermaid-static.js";
import { remarkCallouts } from "./src/plugins/remark-callouts.js";
import { remarkSourceBadges } from "./src/plugins/remark-source-badges.js";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeParagraphIds } from "./src/plugins/rehype-paragraph-ids.js";
import { rehypeTableWrapper } from "./src/plugins/rehype-table-wrapper.js";

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
  extensions: [".md"],
  remarkPlugins: [
    remarkEscapeAngles,
    remarkMermaidStatic,
    remarkCallouts,
    remarkSourceBadges,
  ],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "prepend" }],
    rehypeParagraphIds,
    rehypeTableWrapper,
  ],
  smartypants: {
    dashes: "oldschool",
  },
};

export default config;
