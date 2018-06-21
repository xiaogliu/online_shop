<template>
  <div>
    <p>我的</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    if (!this.$store.state.userInfo.uid) {
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
