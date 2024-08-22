<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from "vitepress/theme";
import { ref } from "vue";
import { useData } from "vitepress";
const { isDark } = useData();
const { Layout } = DefaultTheme;
const sceneRef = ref(null);
</script>

<template>
  <Layout>
    <Content />
    <template #home-hero-info>
      <div class="title-wrap">
        <h4
          :class="{ '': !isDark }"
          class="title mb"
          style="color: var(--vp-button-alt-bg)"
        >
          Zero
        </h4>
        <h4 class="title" :class="{ '': !isDark }">
          <!-- Hello, Welcome to my blog! -->
        </h4>
      </div>
    </template>
    <template #home-hero-image>
      <div
        class="fade-in-top"
        style="position: relative; width: 100%; height: 100%"
      >
        <div
          id="sceneRef"
          ref="sceneRef"
          style="
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
            cursor: pointer;
            border-radius: 50%;
            overflow: hidden;
          "
        ></div>
      </div>
    </template>
  </Layout>
</template>
