const sidebar_works = require("./config/sidebar/works");
const sidebar_articles = require("./config/sidebar/articles");
const nav_config = require("./config/nav");
module.exports = {
  lang: "zh",
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
      level: 4,
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
    nav: nav_config,
    sidebar: {
      "/articles/": sidebar_articles,
      "/works/": sidebar_works,
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
