<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
const { isDark } = useData();
const { Layout } = DefaultTheme;
console.log(isDark);
</script>

<template>
  <Layout>
    <Content />
    <template #home-hero-image>
      <img v-show="!isDark" src="/banner.png" />
      <h1 style="color: #fff; font-size: 30px;letter-spacing: 1.15rem;" v-show="isDark">该睡觉啦！晚安</h1></template
    >
  </Layout>
</template>
