const sidebar_works = require("./config/sidebar/works");
const sidebar_articles = require("./config/sidebar/articles");
const sidebar_webpack = require("./config/sidebar/webpack");
const sidebar_eat = require("./config/sidebar/eat");
const nav_config = require("./config/nav");
module.exports = {
  lang: "zh",
  title: "Zero",
  appearance: "dark",
  head: [["link", { rel: "icon", href: "/logo.ico" }]],
  themeConfig: {
    logo: "/avatar.png",
    lastUpdated: true,
    search: {
      provider: "local",
    },
    outline: {
      label: "目录",
      level: "deep",
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
      "/articles/project/": sidebar_webpack,
      "/eat/": sidebar_eat,
    },
  },
  srcDir: "./src/pages/",
  assetsDir: "./src/static/",
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
