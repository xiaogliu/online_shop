<template>
  <div id="app">
    <!-- <app-header></app-header> -->
    <router-view/>
  </div>
</template>

<script>
// import AppHeader from '../src/components/Header.vue';

export default {
  name: 'app',
  components: {
    // AppHeader,
  },
  data() {
    return {
      preImg: {
        loading: require('./assets/img/loading.svg'),
      },
    };
  },
};
</script>
<style lang="scss">
// 即便没有内容也不能删除 style 标签，全局样式需要根据 lang="scss" 生效
.mint-toast {
  z-index: 99999 !important;
}
</style>
