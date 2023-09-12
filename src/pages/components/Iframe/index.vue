<template>
  <div v-if="params.type == 'mobile'" class="phone-model">
    <div class="box">
      <iframe
        class="mobile-iframe"
        scrolling="auto"
        :src="iframeMap[params.name]"
      ></iframe>
    </div>
  </div>
  <div v-else class="irframe-container">
    <iframe id="iframe" :src="iframeMap[params.name]" frameborder="0"></iframe>
  </div>
</template>
<script setup>
const { params } = defineProps({
  params: {
    type: Object,
    required: true,
    default: {},
  },
});


const iframeMap = {
  zrui: "http://175.178.39.125:10003",
  foodAdmin: "http://175.178.39.125:10000",
  foodAdminMobile: "http://175.178.39.125:10001",
};
</script>
<style scoped>
iframe {
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
}

* {
  margin: 0;
  padding: 0;
}

#iframe {
  width: 100vw;
  height: 100vh;
}

.mobile-iframe {
  width: 310px;
  height: 590.87024px;
}
.box {
  width: 296px;
  height: 690.87024px;
  overflow: hidden;
}

.phone-model {
  font-size: 16px;
  background-color: #fff;
  width: 330px;
  position: fixed;
  left: 50%;
  top: 10px;
  z-index: 10;
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;
  overflow-y: auto;
  background-image: url(https://v1.uviewui.com/common/iPhoneX_model.png);
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 30px;
  padding: 48px 23px 38px 16px;
}
</style>
