<template>
  <div class="pass">
    <div class="center" bindsubmit="formSubmit">
      <van-field v-model="oldPass" placeholder="请输入原始密码" />
      <van-field v-model="newPass" placeholder="请输入新密码" />
      <van-field v-model="confirmPass" placeholder="请再输入一次" />
      <button class="btn" @click="btn">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "pass",
  components: {},
  data() {
    return {
      oldPass: "",
      newPass: "",
      confirmPass: ""
    };
  },
  methods: {
    btn() {
      let _this = this;
      if (_this.newPass !== _this.confirmPass) {
        this.$toast("请再次输入密码");
        this.confirmPass = "";
      } else {
        let params = {
          oldPassword: _this.oldPass,
          password: _this.newPass
        };
        _this.https
          .fetchPost("/rest/saas_user/updatePassword.htm", params)
          .then(data => {
            if (data.code == 0) {
              window.console.log(data);
              this.$toast.success("修改成功");
              this.$cookies.remove("login");
              this.$router.push("/");
            } else {
              this.$toast(data.msg);
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      }
    }
  }
};
</script>

<style lang="less">
.pass {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .center {
    margin-top: 0.37rem;
    width: 100%;
    padding: 0 0.53rem;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    .van-cell::after {
      border: 0;
    }
    input {
      font-size: 0.75rem;
      height: 2.35rem;
      display: flex;
      align-items: center;
      color: #353535;
      width: 100%;
      border-bottom: 1px solid #dddddd;
    }
    .btn {
      width: 100%;
      height: 2.61rem;
      background: #3f88e7;
      color: #fff;
      border-radius: 3px;
      margin: 34rpx 0;
      font-size: 0.9rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2.13rem 0;
    }
  }
}
</style>
