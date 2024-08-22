---
layout: home

hero:
  # name: "Zero"
  # text: "Hello, Welcome to my blog!"
  # tagline: "'Hello World' is where the programmer's dream begins, 'Ctrl + C, Ctrl + V' is the dream transmission!"
  actions:
    - theme: brand
      text: Github
      link: "https://github.com/ruo-love"
    - theme: alt
      text: CSDN
      link: https://blog.csdn.net/SAXX2

features:
  - title: 作品集
    details: 独立开发的一些有趣的项目和工具
    link: /works/
  - title: 博客文章
    details: 维护了几个CSDN专栏，分享一些技术博客、工作学习遇到的各种“坑”
    link: /articles/
  - title: 简历
    details: 多看我一眼我都会害羞
    link: /mine/
---

<script setup>
import { ref, onMounted, watch } from "vue";
import useThreeModel from "./useThreeModel.js";
import { useData } from "vitepress";
const { isDark } = useData();
const { startRenderThreeD } = useThreeModel();
onMounted(()=>{
  const sceneRef=document.getElementById('sceneRef')
  const { action,playAnimation }=startRenderThreeD(sceneRef, isDark);

})

</script>
