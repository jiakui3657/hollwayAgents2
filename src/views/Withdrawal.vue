<template>
  <div class="withdrawals">
    <div class="money">
      <div class="title">提现金额</div>
      <div class="price">
        <div>￥</div>
        <van-field v-model="price" placeholder="请输入提现金额" />
        <span>百元</span>
      </div>
      <div class="withdrawal_price">当前可提现收益为：￥4.80</div>
      <div class="withdrawal_title">*2个工作日内到帐到微信余额</div>
    </div>
    <div class="record">提现记录</div>
    <van-list
      class="withdrawal"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell class="withdrawalList" v-for="(item, index) in 20" :key="index">
        <div>提现：￥100</div>
        <div>日期：10 - 22</div>
      </van-cell>
    </van-list>
    <div class="btn">提现</div>
  </div>
</template>

<script>
export default {
  name: "withdrawal",
  components: {},
  data() {
    return {
      loading: false,
      finished: true,
      price: ""
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang="less">
.withdrawals {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  .money {
    width: 100%;
    background: #fff;
    padding: 1.06rem 0;
    padding-left: 0.75rem;
    box-sizing: border-box;
    height: 9.86rem;
    text-align: left;
  }

  .title {
    font-size: 0.85rem;
    color: #020202;
  }

  .price {
    margin-top: 0.53rem;
    display: flex;
    align-items: center;
    color: #020202;
    height: 3.33rem;
    padding-left: 0.26rem;
    border-bottom: 1px solid #447ed0;
  }

  .price div {
    font-size: 1.33rem;
    color: #020202;
  }

  .price input {
    font-size: 0.96rem;
    color: #020202;
  }

  .van-cell {
    width: 50%;
  }

  .van-cell:not(:last-child)::after {
    border-bottom: 0px;
  }

  .price .placeholder {
    font-size: 0.75rem;
    color: #999;
  }

  .price span {
    color: #020202;
    font-size: 0.75rem;
  }

  .withdrawal_price {
    margin-top: 0.53rem;
    font-size: 0.75rem;
    color: #7f7f7f;
  }

  .withdrawal_title {
    margin-top: 0.53rem;
    color: #c3c3c3;
    font-size: 0.7rem;
  }

  .withdrawal {
    flex: 1;
    overflow: auto;
    background: #fff;
    padding-bottom: 2.61rem;
  }

  .van-cell__value {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .record {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.96rem;
    color: 020202;
    height: 2.61rem;
  }

  .withdrawalList {
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.85rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.75rem;
    color: #020202;
    border-bottom: 1px solid #f4f4f4;
  }

  .withdrawalList:last-child {
    border: 0;
  }

  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2.61rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.85rem;
    background: #3f88e7;
  }
}
</style>
