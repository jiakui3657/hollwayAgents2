<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    //在页面加载时读取cookies里的状态信息
    if (this.$cookies.get("store")) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, this.$cookies.get("store"))
      );
    }

    //在页面刷新时将vuex里的信息保存到cookies里
    window.addEventListener("beforeunload", () => {
      this.$cookies.set("store", this.$store.state, 2 * 60 * 60);
    });
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}
</style>
