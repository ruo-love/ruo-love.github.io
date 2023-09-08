module.exports = {
  lang: "zh",
  base:'/',
  srcDir: "./src/pages/",
  title: "Zero",
  themeConfig: {
    logo: "/logo.svg",
    lastUpdated: true,
    search: {
      provider: "local",
    },
    outline: {
      label: "目录",
    },
    externalLinkIcon: true,
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
      { icon: "twitter", link: "" },
      // You can also add custom icons by passing SVG as string:
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        },
        link: "",
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: "cool link",
      },
    ],
    footer: {
      message:
        'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>',
    },
    nav: [
      { text: "首页", link: "/", activeMatch: "/" },
      { text: "作品", link: "/works/", activeMatch: "/works/" },
      { text: "博客", link: "/articles/", activeMatch: "/articles/" },
      { text: "关于我", link: "/mine/", activeMatch: "/mine/" },
    ],

    sidebar: {
      "/articles/": [
        {
          text: "articles",
          items: [
            { text: "Index", link: "/articles/" },
            { text: "Introduction", link: "/articles/introduction" },
            { text: "Getting Started", link: "/articles/getting-started" },
          ],
        },
      ],
      "/works/": [
        {
          text: "works",
          items: [
            { text: "Index", link: "/works/" },
            { text: "Introduction", link: "/works/introduction" },
            { text: "Getting Started", link: "/works/getting-started" },
          ],
        },
      ],
    },
  },
  markdown: {
    theme: "material-theme-palenight",
    lineNumbers: true,
    anchor: {
      slugify(str) {
        return encodeURIComponent(str);
      },
    },
  },
};
