// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Venezuela S.A.",
  tagline: "La Empresa de 40 Millones de Socios",
  favicon: "img/favicon.ico",
  url: "https://venezuela-s-a.github.io",
  baseUrl: "/venezuela-sa/",
  organizationName: "Venezuela-S-A",
  projectName: "venezuela-sa",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    localeConfigs: {
      es: { label: "Español", direction: "ltr", htmlLang: "es" },
      en: { label: "English", direction: "ltr", htmlLang: "en" },
    },
  },
  markdown: {
    mermaid: true,
    format: "md",
  },
  plugins: [
    "docusaurus-graph",
    [
      "@coffeecup_tech/docusaurus-plugin-structured-data",
      {
        verbose: false,
        docsDir: "docs",
        baseSchema: {
          organization: {
            "@id": "https://venezuela-s-a.github.io/venezuela-sa/#organization",
            "@type": "Organization",
            name: "Venezuela S.A.",
            url: "https://venezuela-s-a.github.io/venezuela-sa/",
          },
          website: {
            "@id": "https://venezuela-s-a.github.io/venezuela-sa/#website",
            "@type": "WebSite",
            name: "Venezuela S.A. — Plan de Reconstrucción Nacional",
            url: "https://venezuela-s-a.github.io/venezuela-sa/",
          },
        },
      },
    ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 85,
        max: 1030,
        min: 640,
        steps: 4,
        disableInDev: true,
      },
    ],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: false,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          { tagName: "link", rel: "icon", href: "/img/favicon.ico" },
          { tagName: "link", rel: "manifest", href: "/manifest.json" },
          { tagName: "meta", name: "theme-color", content: "#1b1b1d" },
        ],
      },
    ],
  ],
  themes: [
    "@docusaurus/theme-mermaid",
    [
      "@cmfcmf/docusaurus-search-local",
      {
        language: ["es", "en"],
        indexBlog: false,
        indexPages: false,
      },
    ],
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: ({ docPath }) =>
            `https://github.com/Venezuela-S-A/venezuela-sa/issues/new?title=${encodeURIComponent(`Editar: ${docPath}`)}&body=${encodeURIComponent(`## Página\n\`${docPath}\`\n\n## Sugerencia\n\n_Describe qué cambiarías, qué dato es incorrecto o qué falta._\n`)}`,
          numberPrefixParser: false,
          routeBasePath: "/",
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          filename: "sitemap.xml",
        },
        theme: { customCss: "./src/css/custom.css" },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Venezuela S.A.",
        items: [
          {
            type: "docSidebar",
            sidebarId: "planSidebar",
            position: "left",
            label: "El Plan",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            href: "https://github.com/Venezuela-S-A/venezuela-sa",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Venezuela S.A. — Plan de Reconstrucción Nacional — v1.0 Marzo 2026. Todos los datos verificables.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      mermaid: {
        theme: { light: "neutral", dark: "dark" },
      },
    }),
};

export default config;
