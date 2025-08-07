import DefaultTheme from "vitepress/theme";
import "./main.css";
import MyLayout from "./component/MyLayout.vue";
import '@zrcode/write-font/css/write-font.css';

export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout: MyLayout,
};
