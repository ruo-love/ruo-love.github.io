<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from "vitepress/theme";
const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <Content />
    <template #home-hero-image
      ><img src="../images/banner.png" /></template
    >
  </Layout>
</template>
