<template>
  <div class="vipMembers">
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        负责人：
      </div>
      <div class="itemRight">
        <van-field
          maxlength="5"
          v-model="name"
          value="name"
          placeholder="请输入负责人名称"
        />
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        所属行业：
      </div>
      <div class="itemRight">
        <van-field
          readonly
          clickable
          :value="industry"
          placeholder="选择行业"
          @click="industryPicker = true"
        />
        <van-popup v-model="industryPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="industryList"
            :default-index="industryIndex"
            value-key="name"
            @cancel="industryPicker = false"
            @confirm="industryChange"
          />
        </van-popup>
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        商家分类：
      </div>
      <div class="itemRight">
        <van-field
          readonly
          clickable
          :value="shop"
          placeholder="选择商家类型"
          @click="shopPicker = true"
        />
        <van-popup v-model="shopPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="shopList"
            :default-index="shopIndex"
            @cancel="shopPicker = false"
            @confirm="shopChange"
          />
        </van-popup>
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        折扣比例：
      </div>
      <div class="itemRight">
        <van-field v-model="discount" value="discount" placeholder="8即是8折" />
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        商家logo：
      </div>
      <div class="itemRight logo">
        <van-uploader :max-count="1" v-model="logo" :after-read="afterLogo" />
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        商家门头：
      </div>
      <div class="itemRight logo">
        <van-uploader
          :max-count="1"
          v-model="mentou"
          :after-read="afterBanner"
        />
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        会员特权：
      </div>
      <div class="itemRight">
        <van-field
          v-model="privilege"
          value="privilege"
          maxlength="30"
          placeholder="30字限制"
        />
      </div>
    </div>
    <div class="item">
      <div class="itemLeft">
        <span>*</span>
        商家简介：
      </div>
      <div class="itemRight">
        <van-cell-group>
          <van-field
            v-model="note"
            value="note"
            rows="1"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="100字限制"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="btn" @click="btn">提交</div>
  </div>
</template>

<script>
export default {
  name: "vipMembers",
  components: {},
  data() {
    return {
      shopId: "",
      name: "",
      discount: "",
      logo: [{ url: "" }],
      mentou: [{ url: "" }],
      privilege: "",
      note: "",
      industry: "",
      industryIndex: 0,
      industryPicker: false,
      industryList: [],
      shop: "",
      shopIndex: 0,
      shopPicker: false,
      shopList: ["会员商家", "协议商家"]
    };
  },
  mounted: function() {
    this.getIndustryList().then(() => {
      this.getShopInfo();
    });
  },
  methods: {
    getShopInfo() {
      let _this = this;
      _this.shopId = _this.$route.query.id;
      let params = {
        id: _this.$route.query.id
      };
      return _this.https
        .fetchPost("/rest/agentVenue/info.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            _this.name = data.name;
            _this.discount = data.rebate;
            _this.logo[0].url = data.logo;
            _this.mentou[0].url = data.mentou;
            _this.privilege = data.privilege;
            _this.note = data.note;
            _this.industry = data.catalog;
            _this.shop = data.venueType;
            window.console.log(_this.industryList);
            _this.industryList.forEach((item, index) => {
              item.index = index;
              if (item.name == data.catalog) {
                _this.industryIndex = index;
              }
            });
            _this.shopList.forEach((item, index) => {
              if (item == data.venueType) {
                _this.shopIndex = index;
              }
            });
            return Promise.resolve();
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    getIndustryList() {
      let _this = this;
      let params = {};
      return _this.https
        .fetchPost("/rest/venue/catalogs.htm", params)
        .then(data => {
          if (data.code == 0) {
            window.console.log(data);
            _this.industryList = data.list;
            return Promise.resolve();
          } else {
            this.$toast(data.msg);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },
    afterLogo(file) {
      window.console.log(file);
    },
    afterBanner(file) {
      window.console.log(file);
    },
    industryChange(picker) {
      window.console.log(picker);
      this.industry = picker.name;
      this.industryIndex = picker.index;
      this.industryPicker = false;
    },
    shopChange(picker) {
      this.shop = picker;
      this.shopPicker = false;
    },
    btn() {
      let _this = this;
      window.console.log(_this.industryIndex, _this.shopIndex);
      let params = {
        id: _this.shopId,
        name: _this.name,
        logo: _this.logo[0].url,
        mentou: _this.mentou[0].url,
        note: _this.note,
        privilege: _this.privilege,
        rebate: _this.discount,
        catalog: _this.industryList[_this.industryIndex].id,
        venueType: _this.shop == "会员商家" ? "vip" : "single"
      };
      _this.https
        .fetchPost("/rest/agentVenue/update.htm", params)
        .then(data => {
          if (data.code == 0) {
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
.vipMembers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  padding-bottom: 2.61rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0 0.8rem;
  box-sizing: border-box;

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

  .itemLeft span {
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

  .van-field {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .van-cell-group {
    width: 100%;
    &:after {
      border: 0;
    }
  }

  .logo,
  .door {
    border: 0;
    height: auto;
  }

  .logo img {
    width: 4rem;
    height: 4rem;
    display: block;
  }

  .door img {
    height: 5.33rem;
    width: 13.33rem;
    display: block;
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
