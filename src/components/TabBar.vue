<template>
  <div class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home">
        <span>运营</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.operating : icon.operating_selected"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/statistical">
        <span>统计</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.statistics : icon.statistics_selected"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/we">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.we : icon.we_selected"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  props: { index: Number },
  components: {},
  data() {
    return {
      active: this.index,
      icon: {
        operating: require("../assets/operating.jpg"),
        operating_selected: require("../assets/operating_selected.jpg"),
        statistics: require("../assets/statistics.jpg"),
        statistics_selected: require("../assets/statistics_selected.jpg"),
        we: require("../assets/we.jpg"),
        we_selected: require("../assets/we_selected.jpg")
      }
    };
  }
};
</script>
