module.exports = {
  lang: "zh",
  base: "/",
  srcDir: "./src/pages/",
  title: "Zero",
  themeConfig: {
    logo: "/avatar.png",
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
    socialLinks: [{ icon: "github", link: "https://github.com/ruo-love" }],
    footer: {
      message: "",
      copyright: "",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "作品", link: "/works/", activeMatch: "/works/" },
      { text: "博客", link: "/articles/", activeMatch: "/articles/" },
      { text: "关于我", link: "/mine/", activeMatch: "/mine/" },
    ],

    sidebar: {
      "/articles/": [
        {
          text: "前端",
          items: [
            { text: "Index", link: "/articles/" },
            { text: "Introduction", link: "/articles/introduction" },
            { text: "Getting Started", link: "/articles/getting-started" },
          ],
        },
        {
          text: "后端",
          items: [
            { text: "Index", link: "/articles/" },
            { text: "Introduction", link: "/articles/introduction" },
            { text: "Getting Started", link: "/articles/getting-started" },
          ],
        },
        {
          text: "数据库",
          items: [
            { text: "Index", link: "/articles/" },
            { text: "Introduction", link: "/articles/introduction" },
            { text: "Getting Started", link: "/articles/getting-started" },
          ],
        },
        {
          text: "Python",
          items: [
            { text: "Index", link: "/articles/" },
            { text: "Introduction", link: "/articles/introduction" },
            { text: "Getting Started", link: "/articles/getting-started" },
          ],
        },
        {
          text: "Flutter",
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
    theme: "vitesse-light",
    lineNumbers: true,
    anchor: {
      slugify(str) {
        return encodeURIComponent(str);
      },
    },
  },
};
