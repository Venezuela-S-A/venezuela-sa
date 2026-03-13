// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Venezuela S.A.",
  tagline: "La Empresa de 40 Millones de Socios",
  favicon: "img/favicon.ico",
  url: "https://venezuela-sa.org",
  baseUrl: "/",
  organizationName: "venezuela-sa",
  projectName: "plan",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: { defaultLocale: "es", locales: ["es"] },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/venezuela-sa/venezuela-sa/tree/main/",
        },
        theme: { customCss: require.resolve("./src/css/custom.css") },
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
            href: "https://github.com/venezuela-sa/plan",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Venezuela S.A. — Plan de Reconstrucción Nacional — v6.0 Marzo 2026. Todos los datos verificables.`,
      },
      prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme },
    }),
};

module.exports = config;
