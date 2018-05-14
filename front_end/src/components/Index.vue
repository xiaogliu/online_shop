<template>
  <div class="index">
    <div class="content">
        <router-view/>
    </div>
  </div>
</template>

<script>
import requests from '../lib/requests';

export default {
  name: 'Index',
  data() {
    return {
      activeNameAccountant: 'first',
      activeNameOther: 'first',
      isCheckedName: false,
      userType: 'accountan',
    };
  },
  methods: {
    async testURL() {
      const res = await requests.test();
    },
    handleClick(tab, event) {
      console.log(111);
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  margin-top: pxToRem(120px);
}
</style>
