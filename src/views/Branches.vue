<template>
  <div class="branches">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          class="branchesList"
          v-for="(item, index) in branches.list"
          :key="index"
          @click.stop="branchDetails(item.id)"
        >
          <div class="shopName">
            <div>{{ item.name }}</div>
            <div>{{ item.phone }}</div>
          </div>
          <div class="shopTime">
            <div>服务时间: 06-22</div>
            <div>创建人： {{ item.creater }}</div>
          </div>
          <div class="shopAddress">{{ item.address }}</div>
          <div class="shopEarnings">
            <div>今日收益： ￥22</div>
            <div>本月收益： ￥220</div>
            <div>总收益： ￥242</div>
          </div>
          <div class="special" v-for="(items, idx) in item.devices" :key="idx">
            <div class="product">
              <div>产品类型： 充电宝</div>
              <div>设备ID： {{ items.sn }}</div>
            </div>
            <div class="func">
              <div @click.stop="branches_details(items.id)">
                <img :src="require('../assets/editor.jpg')" alt="" />
                <span>编辑</span>
              </div>
              <div @click.stop="branchesManagement(items.id)">
                <img :src="require('../assets/management.jpg')" alt="" />
                <span>管理</span>
              </div>
              <div class="del" @click.stop="del(items.id, index, idx)">
                <img :src="require('../assets/del.jpg')" alt="" />
                <span>删除</span>
              </div>
            </div>
          </div>
          <div class="setUp">
            <div @click.stop="addEquipment(item.id)">创建设备</div>
            <div @click.stop="vip_members(item.id)">会员设置</div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <div class="btn" @click.stop="create_branches">创建网点</div>
  </div>
</template>

<script>
export default {
  name: "branches",
  components: {},
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      branches: {}
    };
  },
  mounted: function() {
    this.getBranches(1, this.$store.state.size).then(() => {
      if (this.branches.no >= this.branches.totalPage) {
        this.finished = true;
      }
    });
  },
  methods: {
    getBranches(no, size) {
      let _this = this;
      let params = {
        no,
        size: size
      };
      return _this.https
        .fetchPost("/rest/agent/page.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            if (no > 1) {
              _this.branches.list = _this.branches.list.concat(data.list);
              _this.branches.no = _this.branches.no + 1;
            } else {
              _this.branches = data;
            }
            return Promise.resolve();
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    del(id, index, idx) {
      window.console.log(id, index, idx);
      let _this = this;
      this.$dialog
        .confirm({
          title: "标题",
          message: "是否删除网店"
        })
        .then(() => {
          let params = {
            id
          };
          _this.https
            .fetchPost("/rest/agentVenue/deleteDevice.htm", params)
            .then(data => {
              if (data.code == 0) {
                window.console.log(data);
                _this.branches.list[index].devices.splice(idx, 1);
                this.$toast.success("删除成功");
              } else {
                this.$toast(data.msg);
              }
            })
            .catch(err => {
              window.console.log(err);
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    branchesManagement(id) {
      this.$router.push({ path: "branchesManagement", query: { id: id } });
    },
    addEquipment(id) {
      this.$router.push({ path: "addEquipment", query: { id: id } });
    },
    branchDetails(id) {
      this.$router.push({ path: "branchDetails", query: { id: id } });
    },
    vip_members(id) {
      this.$router.push({ path: "vipMembers", query: { id: id } });
    },
    onLoad() {
      if (this.branches.no && this.branches.no < this.branches.totalPage) {
        this.getBranches(this.branches.no + 1, this.$store.state.size);
      } else if (this.branches.no) {
        this.finished = true;
      }
    },
    onRefresh() {
      this.getBranches(1, this.branches.no * this.$store.state.size).then(
        () => {
          this.isLoading = false;
          this.$toast.success("刷新成功");
        }
      );
    },
    create_branches() {
      this.$router.push("createBranches");
    },
    branches_details(id) {
      this.$router.push({ path: "branchesDetails", query: { id: id } });
    }
  }
};
</script>

<style lang="less">
.branches {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  padding-bottom: 2.61rem;
  box-sizing: border-box;
  .van-pull-refresh {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
  }

  .branchesList {
    margin-top: 0.53rem;
    background: #fff;
    width: 100%;
    padding: 1.21rem 1.01rem;
    box-sizing: border-box;
    font-size: 0.75rem;
    color: #101010;
    &:first-child {
      margin-top: 0;
    }
  }

  .shopName,
  .shopTime,
  .shopAddress {
    display: flex;
    margin-top: 0.32rem;
  }

  .shopName {
    margin-top: 0rpx;
  }

  .shopName div {
    width: 50%;
    display: flex;
    align-items: center;
  }

  .shopTime div {
    width: 50%;
    display: flex;
    align-items: center;
  }

  .shopEarnings {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.32rem;
  }

  .special {
    display: flex;
    justify-content: space-between;
  }

  .product {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: left;
    div {
      margin-top: 0.32rem;
    }
  }

  .func {
    display: flex;
    justify-content: space-between;
    width: 30%;
    div {
      box-sizing: border-box;
      font-size: 0.64rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:last-child {
        color: #b43b44;
      }
    }
    img {
      width: 1.12rem;
      height: 1.12rem;
      display: block;
    }
  }

  .setUp {
    display: flex;
    justify-content: center;
    margin-top: 0.8rem;
    div {
      width: 5.6rem;
      height: 1.86rem;
      border-radius: 3px;
      color: #fff;
      background: #3f88e7;
      font-size: 0.7rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 1.33rem;
    }
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
