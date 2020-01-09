<template>
  <div class="wes">
    <div class="nav">
      <div class="userInfo">
        <img :src="avatar" alt="" />
        <span>贾魁</span>
      </div>
    </div>
    <div class="earningsInfo">
      <div class="withdrawal">
        <div class="title">可提现收益</div>
        <div class="withdrawal_price">￥ <span>4.80</span></div>
      </div>
      <div class="earnings">
        <div class="title">累计收益</div>
        <div class="earnings_price">￥ 4.80</div>
      </div>
      <div class="withdrawal_btn" @click="withdrawal">提现</div>
    </div>
    <div class="list">
      <div class="item" @click="modify">
        <div>
          <img class="icon" :src="require('../assets/tool.jpg')" alt="" />
          修改密码
        </div>
        <span>></span>
      </div>
      <div class="item" @click="exit">
        <div>
          <img class="icon" :src="require('../assets/exit.jpg')" alt="" />
          退出登录
        </div>
        <span>></span>
      </div>
    </div>
    <TabBar v-bind:index="2" />
  </div>
</template>

<script>
// @ is an alias to /src
import TabBar from "@/components/TabBar.vue";

export default {
  name: "we",
  components: {
    TabBar
  },
  data() {
    return {
      avatar: require("../assets/logo.jpg")
    };
  },
  methods: {
    withdrawal() {
      this.$router.push("withdrawal");
    },
    modify() {
      this.$router.push("pass");
    },
    exit() {
      this.$dialog
        .confirm({
          title: "标题",
          message: "是否退出登录"
        })
        .then(() => {
          this.$cookies.remove("login");
          this.$router.push("/");
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less">
.wes {
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

  .userInfo {
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: #fff;
    padding: 0.8rem;
    box-sizing: border-box;
  }

  .userInfo img {
    width: 3.68rem;
    height: 3.68rem;
    display: block;
    margin-right: 1.28rem;
  }

  .earningsInfo {
    width: 18.5rem;
    height: 9.06rem;
    background: #fff;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: -4.03rem;
    padding: 1.06rem 0.75rem;
    box-sizing: border-box;
    position: relative;
    text-align: left;
  }

  .title {
    font-size: 0.64rem;
    color: #b1b1b1;
  }

  .withdrawal_price {
    font-size: 0.85rem;
    color: #3b89f5;
    margin-top: 0.43rem;
  }

  .withdrawal_price text {
    font-size: 1.5rem;
  }

  .earnings {
    margin-top: 1.6rem;
  }

  .earnings_price {
    font-size: 0.85rem;
    color: #818181;
    margin-top: 0.43rem;
  }

  .withdrawal_btn {
    position: absolute;
    right: 1.65rem;
    top: 1.4rem;
    width: 2.66rem;
    height: 1.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #527de3;
    font-size: 0.75rem;
    color: #527de3;
    border-radius: 2px;
  }

  .list {
    width: 18.5rem;
    background: #fff;
    margin: 0 auto;
    margin-top: 0.53rem;
  }

  .item {
    height: 2.3rem;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.75rem;
    font-size: 0.75rem;
    color: #1e1e1e;
    justify-content: space-between;
    border-bottom: 1px solid #efefef;
  }

  .item:last-child {
    border-bottom: 0px solid #efefef;
  }

  .item div {
    display: flex;
    align-items: center;
  }

  .item img {
    width: 1.6rem;
    height: 1.6rem;
    display: block;
    margin-right: 0.75rem;
  }

  .item span {
    font-size: 0.85rem;
    color: #cbcbcd;
  }
}
</style>
