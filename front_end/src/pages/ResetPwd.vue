<template>
  <div class="accountant-account">
  </div>
</template>

<script>
import requests from '../lib/requests';

export default {
  name: 'AccountantAccount',
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
    handleClick(tab, event) {},
  },
};
</script>

<style lang="scss" scoped>
.accountant-account {
}
</style>
