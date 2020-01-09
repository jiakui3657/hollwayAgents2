<template>
  <div class="home">
    <div class="nav"></div>
    <div class="user">
      <div class="userName">欢迎代理商{{ userInfo.name }}！</div>
      <div class="userEarnings">今日收益：￥{{ userInfo.todayMoney }}</div>
    </div>
    <div class="we">
      <div class="server" @click="branches">
        <div>
          我的网店<span>{{ userInfo.venueNum }}</span>
        </div>
        <span>我创建的服务网点</span>
      </div>
      <div class="server" @click="team">
        <div>
          我的团队<span>{{ userInfo.teamNum }}</span>
        </div>
        <span>我的下级代理</span>
      </div>
    </div>
    <TabBar v-bind:index="0" />
  </div>
</template>

<script>
import { mapState } from "vuex";

// @ is an alias to /src
import TabBar from "@/components/TabBar.vue";

export default {
  name: "home",
  components: {
    TabBar
  },
  data() {
    return {};
  },
  mounted: function() {
    window.console.log(this.userInfo);
  },
  computed: {
    ...mapState({
      userInfo: "userInfo"
    })
  },
  methods: {
    branches: function() {
      this.$router.push({ path: "branches" });
    },
    team: function() {
      this.$router.push({ path: "team" });
    }
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #f5f5f5;
  .nav {
    height: 9.28rem;
    width: 100%;
    background: #5ba0ee;
  }

  .user {
    height: 9rem;
    border-radius: 10px;
    background: #fff;
    width: 18.5rem;
    margin: -7rem auto;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    flex-direction: column;
    justify-content: center;
  }

  .user div {
    margin: 0.5rem 0;
  }

  .we {
    width: 18.5rem;
    justify-content: space-between;
    display: flex;
    margin: 7.56rem auto;
  }

  .we .server {
    height: 3.78rem;
    border-radius: 0.26rem;
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 1.12rem;
    box-sizing: border-box;
    background: #fff;
    align-items: flex-start;
  }

  .we .server div {
    font-size: 0.85rem;
    color: #2f2f2f;
    display: flex;
    align-items: center;
  }

  .we .server div span {
    font-size: 0.53rem;
    color: #d2754c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.64rem;
    height: 0.85rem;
    border-radius: 3px;
    background: #fcf1eb;
    margin-left: 0.64rem;
    margin-top: 0;
  }

  .we .server span {
    font-size: 0.75rem;
    color: #878787;
    display: inline-block;
    margin-top: 0.2rem;
  }
}
</style>
