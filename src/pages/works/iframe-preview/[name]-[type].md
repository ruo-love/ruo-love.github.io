---
layout: home
---

<script setup>
// import Iframe from '../../components/Iframe/index.vue';
import { useData } from 'vitepress'

// params is a Vue ref
const { params } = useData()

console.log('params',params)

</script>
{{params}}
<!-- <Iframe :params="params"/> -->
