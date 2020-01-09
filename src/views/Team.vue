/* eslint-disable vue/valid-v-bind */
<template>
  <div class="team">
    <div class="search">
      <van-field
        v-model="value"
        maxlength="10"
        placeholder="请输入业务员的名称"
      />
      <span @click="search">搜索</span>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :offset="50"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in team.list" :key="index">
          <img :src="item.avatar" alt="" srcset="" />
          <div class="salesmanList_r">
            <div class="salesmanName">
              <span>{{ item.name }}</span>
              <span>{{ item.phone }}</span>
            </div>
            <div class="branchesNum">已创建{{ item.num }}个网点</div>
            <div class="earnings">总收益：{{ item.money }}</div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <div class="btn" @click="addSalesman">添加业务员</div>
  </div>
</template>

<script>
export default {
  name: "we",
  components: {},
  data() {
    return {
      value: "",
      team: {},
      loading: false,
      finished: false,
      no: 1,
      isLoading: false
    };
  },
  mounted: function() {
    this.getTeam(this.no, this.$store.state.size);
  },
  methods: {
    onLoad() {
      if (this.team.no && this.team.no < this.team.totalPage) {
        this.team.no = this.team.no + 1;
        this.getTeam(this.team.no, this.$store.state.size).then(() => {
          this.loading = false;
        });
      } else if (this.team.no && this.team.no >= this.team.totalPage) {
        this.finished = true;
      } else {
        this.loading = false;
      }
    },
    onRefresh() {
      this.getTeam(1, this.team.no * this.$store.state.size).then(() => {
        this.isLoading = false;
        this.$toast.success("刷新成功");
      });
    },
    getTeam(no, size, name = "") {
      let _this = this;
      let params = {
        name: name,
        no: no,
        size: size
      };
      return _this.https
        .fetchPost("/rest/agent/teams.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            if (no > 1) {
              _this.team.list = _this.team.list.concat(data.list);
            } else {
              _this.team = data;
            }
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    search() {
      this.getTeam(this.no, this.$store.state.size, this.value);
    },
    addSalesman() {
      this.$router.push("/addSalesman");
    }
  }
};
</script>

<style lang="less">
.team {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
  .van-nav-bar {
    width: 100%;
  }
  .search {
    width: 100%;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 0.75rem;
    background: #5ba0ee;
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 1;
    input {
      flex: 1;
      height: 1.33rem;
      font-size: 0.7rem;
      color: #101010;
      background: #fff;
      padding-left: 0.27rem;
    }
    .van-cell {
      padding: 0;
    }
    view {
      height: 1.33rem;
      display: flex;
      align-items: center;
    }
    span {
      font-size: 0.75rem;
      color: #101010;
      width: 2.61rem;
      height: 1.33rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .van-pull-refresh {
    padding-top: 2.4rem;
    padding-bottom: 2.61rem;
    .van-cell {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 1.21rem 1.01rem;
      font-size: 0.7rem;
      color: #101010;
      background: #fff;
      margin-top: 0.53rem;
      .van-cell__value--alone {
        display: flex;
      }
      img {
        width: 3.73rem;
        height: 3.73rem;
        border-radius: 0.53rem;
        display: block;
        margin-right: 0.85rem;
      }
      .salesmanList_r {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .salesmanName {
        display: flex;
        justify-content: space-between;
      }
      &:first-child {
        margin-top: 0;
      }
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
