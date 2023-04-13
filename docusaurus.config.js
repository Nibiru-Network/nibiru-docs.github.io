// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nibiru Network Documentation',
  tagline: 'Learn how to use the Nibiru Network',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://nibiru-docs.github.io',
  // url: 'https://docs.nibirunet.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Nibiru-Network', // Usually your GitHub org/user name.
  projectName: 'Documentation', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: `/`,
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Nibiru-Network/nibiru-docs.github.io/tree/main',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Nibiru Network',
        logo: {
          alt: 'Nibiru Network Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/Nibiru-Network/nibiru-docs.github.io',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/nibiru_insider',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/nibiru_network',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Nibiru-Network',
              },
              {
                label: 'Nibiruscan Block Explorer',
                href: 'https://www.nibiruscan.io',
              },
              {
                label: 'Whitepaper',
                href: 'https://nibirunet.io/wp-content/uploads/2023/04/Nibiru_Whitepaper_V2.1.pdf',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nibiru Network`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
