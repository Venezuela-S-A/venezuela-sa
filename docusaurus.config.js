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
          editUrl: ({ docPath }) =>
            `https://github.com/Venezuela-S-A/venezuela-sa/issues/new?title=${encodeURIComponent(`Editar: ${docPath}`)}&body=${encodeURIComponent(`## Página\n\`${docPath}\`\n\n## Sugerencia\n\n_Describe qué cambiarías, qué dato es incorrecto o qué falta._\n`)}`,
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
