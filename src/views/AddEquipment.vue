<template>
  <div class="branchesDetails">
    <div class="shopInfo">
      <div>
        网点名称<span>{{ shop.name }}</span>
      </div>
      <div>
        服务时间<span>{{ shop.time }}</span>
      </div>
      <div>
        服务电话<span>{{ shop.phone }}</span>
      </div>
      <div>
        设备地址<span>{{ shop.address }}</span>
      </div>
    </div>
    <div class="equipmentInfo">
      <div class="basisInfo"><span>产品类型</span>{{ shop.catalog }}</div>
      <div class="equipmentType">
        <span>设备类型</span>
        <div>充电宝</div>
        <div>半小时</div>
      </div>
      <div class="billingInfo">
        <span>计费信息</span>
        <div class="billingPrice">
          <div>
            <van-field v-model="halfHour" placeholder="1" /><span
              >元/半小时</span
            >
          </div>
          <div>
            <van-field v-model="day" placeholder="20" /><span
              >元/每天(封顶)</span
            >
          </div>
        </div>
      </div>
      <div class="equipmentCoding">
        <span>设备SN</span>
        <div>
          {{ sn }}
          <img :src="require('../assets/scan.jpg')" alt="" />
        </div>
      </div>
      <div class="bottom">
        <div class="btn" @click="btn">+ 添加设备</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "branchesDetails",
  components: {},
  data() {
    return {
      shop: {},
      halfHour: "",
      day: "",
      sn: "请扫描设备二维码并核对"
    };
  },
  mounted: function() {
    let _this = this;
    let params = {
      id: _this.$route.query.id
    };
    _this.https
      .fetchPost("/rest/agentVenue/info.htm", params)
      .then(data => {
        if (data.code == 0) {
          window.console.log(data);
          this.shop = data;
        } else {
          this.$toast(data.msg);
        }
      })
      .catch(err => {
        window.console.log(err);
      });
  },
  methods: {
    btn() {
      let _this = this;
      if (
        _this.day == "" ||
        _this.halfHour == "" ||
        _this.sn == "请扫描设备二维码并核对"
      ) {
        _this.$toast("请完善信息");
        return;
      }
      let params = {
        id: _this.$route.query.id,
        halfHour: _this.halfHour,
        day: _this.day,
        catalog: _this.shop.catalog,
        sn: _this.sn
      };
      _this.https
        .fetchPost("/rest/agentVenue/addDevice.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            _this.$toast.success("添加成功");
            _this.$router.go(-1);
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
.branchesDetails {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2.61rem;
  box-sizing: border-box;
  width: 100%;
  background: #f5f5f5;
  .shopInfo {
    width: 18.5rem;
    margin: 0.53rem auto;
    background: #fff;
    border-radius: 5px;
    padding: 1.2rem 1.01rem;
    box-sizing: border-box;
    div {
      display: flex;
      margin-top: 0.48rem;
      font-size: 0.7rem;
      color: #808080;
      &:first-child {
        margin-top: 0;
      }
      span {
        color: #141414;
        display: flex;
        flex-wrap: wrap;
        margin-left: 0.9rem;
        flex: 1;
        text-align: left;
      }
    }
  }

  .equipmentInfo {
    width: 18.5rem;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    padding: 1.2rem 0;
    box-sizing: border-box;
  }

  .basisInfo {
    margin-top: 0.48rem;
    color: #141414;
    font-size: 0.7rem;
    display: flex;
    padding: 0 1.01rem;
    &:first-child {
      margin-top: 0;
    }
    span {
      color: #808080;
      margin-right: 0.9rem;
      width: 3.77rem;
      display: flex;
    }
  }

  .equipmentType {
    display: flex;
    margin-top: 0.48rem;
    color: #141414;
    font-size: 0.7rem;
    padding: 0 1.01rem;
    span {
      display: flex;
      color: #303030;
      font-size: 0.7rem;
      margin-right: 0.96rem;
      width: 3.77rem;
      align-items: center;
    }
    div {
      display: flex;
      color: #3d84c4;
      font-size: 0.7rem;
      margin-right: 0.8rem;
      width: 4rem;
      height: 1.6rem;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      border: 1px solid #3d84c4;
    }
  }

  .billingInfo {
    display: flex;
    margin-top: 0.48rem;
    padding: 0 1.01rem;
    span {
      display: flex;
      color: #303030;
      font-size: 0.7rem;
      margin-right: 0.96rem;
      width: 3.77rem;
      padding-top: 0.2rem;
    }
    .billingPrice {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: -0.13rpx;
      div {
        display: flex;
        align-items: center;
        color: #303030;
        font-size: 0.7rem;
        padding: 0;
        &:after {
          border: 0;
        }
        .van-cell {
          width: 4.42rem;
          color: #303030;
          font-size: 0.7rem;
        }
      }
    }
  }

  .equipmentCoding {
    display: flex;
    margin-top: 0.48rem;
    color: #141414;
    font-size: 0.7rem;
    padding: 0 1.01rem;
  }

  .equipmentCoding span {
    display: flex;
    color: #303030;
    font-size: 0.7rem;
    margin-right: 0.96rem;
    width: 2.77rem;
    align-items: center;
  }

  .equipmentCoding div {
    padding: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.6rem;
    border: 1px solid #348bc1;
    color: #348bc1;
    font-size: 0.7rem;
  }

  .equipmentCoding div img {
    width: 0.9rem;
    height: 0.9rem;
    display: block;
    margin-left: 0.42rem;
  }

  .scanBtn {
    height: 2.13rem;
    width: 8.96rem;
    display: flex;
    align-items: center;
    color: #fff;
    background: #c5e3fd;
    justify-content: center;
    font-size: 0.85rem;
    margin: 0 auto;
    margin-top: 0.64rem;
  }

  .bottom {
    margin-top: 0.64rem;
    padding: 1.6rem 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #e0e0e0;
  }

  .btn {
    height: 2.61rem;
    display: flex;
    align-items: center;
    color: #fff;
    background: #1388ef;
    width: 16rem;
    justify-content: center;
    font-size: 0.85rem;
  }
}
</style>
