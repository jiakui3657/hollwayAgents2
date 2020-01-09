<template>
  <div class="createBranches">
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        商家名称：
      </div>
      <div class="itemRight">
        <van-field
          maxlength="10"
          v-model="shopName"
          value="shopName"
          placeholder="请输入商家名称"
        />
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        联系方式：
      </div>
      <div class="itemRight">
        <van-field
          type="number"
          v-model="shopPhone"
          value="shopPhone"
          placeholder="请输入手机号"
        />
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        商家地址：
      </div>
      <div class="itemRight">
        <van-field
          disabled="true"
          v-model="shopAddress"
          value="shopAddress"
          placeholder="请输入商家地址"
        />
      </div>
      <img class="address" :src="require('../assets/scan.jpg')" />
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        服务时间：
      </div>
      <div class="itemRight time">
        <van-field
          readonly
          clickable
          :value="start"
          placeholder="开始时间"
          @click="startTime = true"
        />

        <van-popup v-model="startTime" position="bottom">
          <van-datetime-picker
            v-model="currentTime"
            type="time"
            :min-hour="0"
            :max-hour="23"
            @confirm="getStartTime"
            @cancel="startTime = false"
          />
        </van-popup>
        <span> 至 </span>
        <van-field
          readonly
          clickable
          :value="end"
          placeholder="结束时间"
          @click="endTime = true"
        />

        <van-popup v-model="endTime" position="bottom">
          <van-datetime-picker
            v-model="currentTime"
            type="time"
            :min-hour="0"
            :max-hour="23"
            @confirm="getEndTime"
            @cancel="endTime = false"
          />
        </van-popup>
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        设备类型：
      </div>
      <div class="itemRight type"><span>充电宝</span><span>半小时</span></div>
    </div>
    <div class="item info">
      <div class="itemLeft">
        <span>*</span>
        计费信息：
      </div>
      <div class="itemRight">
        <div><van-field placeholder="1元" />/半小时</div>
        <div><van-field placeholder="20元" />/每天(封顶)</div>
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        设备SN：
      </div>
      <div class="itemRight SN" catchtap="scan">
        <div>{{ sn }}<img :src="require('../assets/scan.jpg')" /></div>
      </div>
    </div>
    <div class="btn" @click="btn">确定创建</div>
  </div>
</template>

<script>
export default {
  name: "createBranches",
  components: {},
  data() {
    return {
      start: "",
      startTime: false,
      currentTime: "",
      end: "",
      endTime: false,
      shopName: "",
      shopPhone: "",
      shopAddress: "",
      sn: "请扫描设备二维码并核对"
    };
  },
  methods: {
    btn() {
      let _this = this,
        // eslint-disable-next-line no-unused-vars
        phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let params = {
        name: _this.shopName,
        phone: _this.shopPhone,
        address: _this.shopAddress,
        lng: _this.lng,
        lat: _this.lat,
        startTime: _this.start,
        endTime: _this.end,
        sn: _this.sn
      };
      if (
        _this.shopName == "" ||
        !phoneReg.test(_this.shopPhone) ||
        _this.shopAddress == "" ||
        _this.start == "" ||
        _this.end == "" ||
        _this.sn == "请扫描设备二维码并核对"
      ) {
        _this.$toast("请补充网点信息");
        return;
      }
      _this.https
        .fetchPost("/rest/agent/create.htm", params)
        .then(data => {
          if (data.code == 0) {
            _this.$toast.success("创建成功");
            _this.$router.go(-1);
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    getStartTime(value) {
      this.start = value;
      this.startTime = false;
    },
    getEndTime(value) {
      window.console.log(value);
      this.end = value;
      this.endTime = false;
    }
  }
};
</script>

<style lang="less">
.createBranches {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0.8rem;
  box-sizing: border-box;
  width: 100%;
  .item {
    display: flex;
    min-height: 2.24rem;
    align-items: center;
    font-size: 0.7rem;
    color: #151412;
    margin-top: 1.33rem;
  }

  .itemLeft {
    width: 4.26rem;
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 0.64rem;
  }

  .itemLeft text {
    color: #ec1d39;
    margin-right: 0.21rem;
    display: flex;
  }

  .itemRight {
    box-sizing: border-box;
    flex: 1;
    min-height: 2.24rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dedede;
  }

  input {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .address {
    width: 1.6rem;
    height: 1.6rem;
    display: block;
    margin-left: 0.64rem;
  }

  .type,
  .SN {
    border: 0;
  }

  .time span {
    margin: 0 0.26rem;
  }

  .type span {
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

  .info {
    align-items: flex-start;
    .itemRight {
      flex-direction: column;
      align-items: flex-start;
      border: 0;
      margin-top: -0.13rem;
      div {
        display: flex;
        align-items: center;
        color: #303030;
        font-size: 0.7rem;
        width: 100%;
      }
      .van-cell {
        width: 4.26rem;
        color: #303030;
        font-size: 0.7rem;
      }
    }
  }

  .van-cell:not(:last-child)::after {
    border: 0;
  }

  .SN div {
    padding: 0 0.53rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.6rem;
    border: 1px solid #348bc1;
    color: #348bc1;
    font-size: 0.7rem;
  }

  .SN img {
    width: 0.9rem;
    height: 0.9rem;
    display: block;
    margin-left: 0.42rem;
  }

  .btn {
    min-width: 100%;
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
