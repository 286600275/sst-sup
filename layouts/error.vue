<style>
.error-code {
  margin: 100px auto;
  font-size: 80px;
  text-align: center;
}

.error-message {
  margin: 50px auto;
  font-size: 30px;
  text-align: center;
}

.action {
  text-align: center;
  font-size: 20px;
}
</style>
<template>
  <div class="container">
    <h1 class="error-code">{{error.statusCode}}</h1>
    <h1 class="error-message">{{error.message}}</h1>
    <div class="action">
      <a href="/auth/login">前往登录页</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ['error'],
  beforeMount() {
    // let error = this.error;
    // console.log('error beforeMounted!')
    // const pattern = /Loading chunk (\d)+ failed/g;
    // const isChunkLoadFailed = error.message.match(pattern);
    // let s = this.$router.history;
    // debugger;
    // const targetPath = this.$router.history.pending.fullPath;
    // if (isChunkLoadFailed) {
    //   console.log('error Loading chunk!')
    //   this.$router.replace(targetPath);
    // }
  },
}
</script>