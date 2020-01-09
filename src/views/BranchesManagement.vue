<template>
  <div class="branchesManagement">
    <div class="shopInfo">
      <div class="shopTitle">充电宝槽位管理</div>
      <div>
        底座ID<span>{{ equipmentInfo.sn }}</span>
      </div>
      <div>
        网络状态<span>{{ equipmentInfo.state }}</span>
      </div>
      <div>
        软件管理<span>{{ equipmentInfo.softVersion }}</span>
      </div>
      <div>
        更新时间<span>{{ equipmentInfo.date }}</span>
      </div>
    </div>
    <div class="equipment">
      <div class="equipmentTitle">
        <div class="equipmentFunc">
          <div class="refresh" @click="refresh">
            <img :src="require('../assets/refresh.jpg')" alt="" />
            <span>刷新</span>
          </div>
          <div class="popupAll" @click="popUpAll(equipmentInfo.id)">
            弹出所有
          </div>
        </div>
        <div class="equipmentTable">
          <span>槽位</span>
          <span>状态</span>
          <span>电量</span>
          <div>充电宝ID</div>
          <span>弹出</span>
        </div>
      </div>
      <div class="scroll">
        <van-list :finished="false" finished-text="没有更多了">
          <van-cell
            class="equipmentList"
            v-for="(item, index) in equipmentInfo.batteries"
            :key="index"
          >
            <span>{{ item.slot }}</span>
            <span>{{ item.state }}</span>
            <span>{{ item.level }}</span>
            <div>{{ item.sn }}</div>
            <span @click="popUp(item.id, index)">弹出</span>
          </van-cell>
        </van-list>
      </div>
      <div class="equipmentBottom">注： 设备左起为1号槽位</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "branchesManagement",
  components: {},
  data() {
    return {
      finished: true,
      equipmentInfo: {}
    };
  },
  mounted: function() {
    this.getEquipment();
  },
  methods: {
    getEquipment() {
      let _this = this;
      let params = {
        id: _this.$route.query.id
      };
      return _this.https
        .fetchPost("/rest/deviceAgent/info.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            _this.equipmentInfo = data;
            return Promise.resolve();
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    popUp(id, index) {
      let _this = this;
      let params = {
        id
      };
      _this.https
        .fetchPost("/rest/deviceAgent/out.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            _this.equipmentInfo.batteries[index].state = "空";
            this.$toast.success("电池弹出成功");
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    popUpAll(id) {
      let _this = this,
        index = -1;
      let params = {
        id
      };
      _this.https
        .fetchPost("/rest/deviceAgent/outAll.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            // eslint-disable-next-line no-unused-vars
            var time = setInterval(() => {
              if (index < _this.equipmentInfo.batteries.length - 1) {
                index += 1;
                _this.equipmentInfo.batteries[index].state = "空";
                window.console.log("电池弹出成功");
              } else {
                clearInterval(time);
                this.$toast.success("电池弹出成功");
              }
            }, 1500);
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    refresh() {
      this.getEquipment().then(() => {
        this.$toast.success("刷新成功");
      });
    }
  }
};
</script>

<style lang="less">
.branchesManagement {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.53rem;
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
    height: 9.6rem;
    overflow: hidden;
  }

  .shopInfo .shopTitle {
    font-size: 0.85rem;
    color: #181818;
    margin-bottom: 1.06rem;
  }

  .shopInfo div {
    display: flex;
    margin-top: 0.48rem;
    font-size: 0.7rem;
    color: #808080;
  }

  .shopInfo div:first-child {
    margin-top: 0;
  }

  .shopInfo div span {
    color: #141414;
    display: flex;
    flex-wrap: wrap;
    margin-left: 0.9rem;
    flex: 1;
  }

  .equipment {
    flex: 1;
    background: #fff;
    border-radius: 5px;
    width: 18.5rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
  }

  .equipmentTitle {
    display: flex;
    flex-direction: column;
    height: 4.32rem;
    padding-top: 0.8rem;
    box-sizing: border-box;
  }

  .equipmentFunc {
    display: flex;
    justify-content: flex-end;
  }

  .refresh {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 1.65rem;
    border-radius: 3px;
    border: 1px solid #c4c4c4;
    font-size: 0.7rem;
    color: #c4c4c4;
    margin-right: 0.48rem;
  }

  .refresh img {
    width: 1.12rem;
    height: 1.12rem;
    display: block;
    margin-right: 0.16rem;
  }

  .popupAll {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.73rem;
    height: 1.65rem;
    border-radius: 3px;
    border: 1px solid #3282e1;
    font-size: 0.7rem;
    color: #3282e1;
    margin-right: 0.58rem;
  }

  .equipmentTable {
    height: 1.92rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #212121;
    font-size: 0.7rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
  }

  .equipmentTable span {
    display: flex;
    width: 2.34rem;
    justify-content: center;
    align-items: center;
    margin-right: 0.32rem;
  }

  .equipmentTable div {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .equipmentBottom {
    font-size: 0.58rem;
    height: 2.24rem;
    padding-left: 0.53rem;
    display: flex;
    align-items: center;
    color: #898989;
    border-top: 1px solid #e7e7e7;
  }

  .scroll {
    flex: 1;
    height: 1px;
    overflow: auto;
  }

  .scroll .equipmentList {
    height: 2.24rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #212121;
    font-size: 0.7rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e7e7e7;
    padding: 0;
  }

  .scroll .equipmentList:last-child {
    border-bottom: 0px solid #e7e7e7;
  }

  .scroll .equipmentList span {
    display: flex;
    width: 2.34rem;
    justify-content: center;
    align-items: center;
    margin-right: 0.32rem;
  }

  .scroll .equipmentList div {
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .scroll .equipmentList span:nth-child(2) {
    color: #8eb694;
  }

  .scroll .equipmentList span:last-child {
    display: flex;
    width: 2.18rem;
    height: 1.65rem;
    border-radius: 3px;
    background: #e2f3ff;
    color: #3f83c4;
    justify-content: center;
    align-items: center;
  }
}
</style>
