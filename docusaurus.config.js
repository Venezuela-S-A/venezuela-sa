// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Venezuela S.A.",
  tagline: "La Empresa de 40 Millones de Socios",
  favicon: "img/favicon.ico",
  url: "https://venezuela-sa.github.io",
  baseUrl: "/venezuela-sa/",
  organizationName: "venezuela-sa",
  projectName: "venezuela-sa",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: { defaultLocale: "es", locales: ["es"] },
  markdown: {
    mermaid: true,
    format: "md",
  },
  themes: ["@docusaurus/theme-mermaid"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/venezuela-sa/venezuela-sa/tree/main/",
          numberPrefixParser: false,
          routeBasePath: "/",
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
            href: "https://github.com/venezuela-sa/venezuela-sa",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Venezuela S.A. — Plan de Reconstrucción Nacional — v6.0 Marzo 2026. Todos los datos verificables.`,
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
