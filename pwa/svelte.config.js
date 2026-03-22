import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "200.html",
      precompress: true,
      strict: false,
    }),
    prerender: {
      // Markdown content links to internal Docusaurus routes (e.g. /07-ejecucion/kpis-activacion)
      // that don't exist in the PWA routing. Warn instead of failing the build.
      handleHttpError: "warn",
    },
    serviceWorker: {
      register: false,
    },
    paths: {
      base: "",
    },
  },
};

export default config;
