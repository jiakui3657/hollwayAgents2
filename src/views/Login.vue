<template>
  <div class="logins">
    <van-image class="logo" :src="login" />
    <div class="login">
      <van-field id="input" v-model="username" placeholder="请输入账号" />
      <van-field
        id="input"
        v-model="password"
        type="password"
        placeholder="请输入密码"
      />
      <van-button id="btn" type="info" @click="sumbit">登录</van-button>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";

export default {
  name: "login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      login: require("../assets/login.jpg")
    };
  },
  mounted: function() {
    let login = this.$cookies.get("login");
    if (login && login != null) {
      window.console.log(login);
      this.username = login.user;
      this.password = login.pass;
    }
  },
  methods: {
    sumbit: function() {
      let _this = this;
      window.console.log(this.username, this.password);
      let params = { username: _this.username, password: _this.password };
      _this.https
        .fetchPost("/rest/saas_user/login.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            window.console.log(this.$cookies.get("login"));
            let obj = {
              user: _this.username,
              pass: _this.password,
              userToken: data.userToken
            };
            this.$cookies.set("login", obj, 2 * 60 * 60);
            this.$toast.success("登录成功");
            return Promise.resolve();
          } else {
            this.$toast(data.msg);
            return Promise.reject();
          }
        })
        .then(_this.getUserInfo)
        .catch(err => {
          window.console.log(err);
        });
    },
    getUserInfo() {
      let _this = this;
      this.$store.dispatch("getUserInfo").then(() => {
        _this.$router.push("/home");
      });
    }
  }
};
</script>

<style lang="less">
.logins {
  height: 100%;
  .logo {
    width: 100%;
    height: 10rem;
    display: block;
  }

  .login {
    box-sizing: border-box;
    width: 100%;
    padding: 0 0.5rem;
  }

  .van-cell {
    font-size: 0.75rem;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #ccc;
  }

  #btn {
    min-width: 100%;
    color: #fff;
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 0;
    margin: 0;
    margin-top: 2.13rem;
    background: #3fa2f5;
  }
}
</style>
