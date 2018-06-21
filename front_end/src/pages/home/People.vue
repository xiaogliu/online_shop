<template>
  <div>
    <p>我的</p>
  </div>
</template>
<script>
import Toast from '../../components/Toast/index';

export default {
  data() {
    return {};
  },
  created() {
    if (!this.$store.state.userInfo.uid) {
      Toast('请先登录');
      this.$router.push({
        name: 'login',
        params: {
          from: 'home/people',
        },
      });
    }
  },
};
</script>
