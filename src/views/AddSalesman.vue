<template>
  <div class="addSalesman">
    <form bindsubmit="formSubmit">
      <div class="item">
        <div class="itemLeft">
          <span>*</span>
          业务员姓名：
        </div>
        <div class="itemRight">
          <van-field
            maxlength="5"
            v-model="name"
            placeholder="请输入负责人名称"
          />
        </div>
      </div>
      <div class="item">
        <div class="itemLeft">
          <span>*</span>
          联系电话：
        </div>
        <div class="itemRight">
          <van-field type="number" v-model="phone" placeholder="请输入手机号" />
        </div>
      </div>
      <div class="item">
        <div class="itemLeft">
          <span>*</span>
          身份证号：
        </div>
        <div class="itemRight">
          <van-field v-model="card" placeholder="请输入身份证号" />
        </div>
      </div>
      <div class="btn" @click="btn">提交</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addSalesman",
  components: {},
  data() {
    return {
      name: "",
      phone: "",
      card: ""
    };
  },
  methods: {
    btn() {
      let _this = this;
      let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let cartReg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
      if (!_this.name.length > 0) {
        this.$toast("请输入姓名");
      } else if (!phoneReg.test(_this.phone)) {
        this.$toast("请输入正确的手机号");
      } else if (!cartReg.test(_this.card)) {
        this.$toast("请输入正确的身份证信息");
      } else {
        let params = {
          name: _this.name,
          phone: _this.phone,
          no: _this.card
        };
        _this.https
          .fetchPost("/rest/agent/addMember.htm", params)
          .then(data => {
            if (data.code == 0) {
              window.console.log(data);
              this.$toast.success("添加成功");
              this.$router.go(-1);
              //   this.$router.replace("/we");
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
.addSalesman {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  form {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 0 0.8rem;
    box-sizing: border-box;
    width: 100%;
  }
  .item {
    display: flex;
    min-height: 2.24rem;
    align-items: center;
    font-size: 0.7rem;
    color: #151412;
    margin-top: 1.33rem;
  }
  .itemLeft {
    width: 5.06rem;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 0.64rem;
  }
  .itemLeft span {
    color: #ec1d39;
    margin-right: 0.21rem;
    display: flex;
    align-items: center;
  }
  .itemRight {
    box-sizing: border-box;
    flex: 1;
    min-height: 2.24rem;
    display: flex;
    align-items: center;
  }
  input {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .btn {
    width: 100%;
    height: 2.61rem;
    font-size: 0.85rem;
    color: #fff;
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius: 3px;
    padding: 0;
    margin: 2.13rem 0;
    background: #3fa3f8;
  }
}
</style>
