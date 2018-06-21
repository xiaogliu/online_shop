<template>
  <div>
    <p>购物车</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$store.state.userInfo.uid) {
      this.$router.push({
        name: 'login',
        params: {
          from: 'home/cart',
        },
      });
    }
  },
};
</script>

<style>
.slider-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>
