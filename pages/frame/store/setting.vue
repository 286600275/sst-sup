<style lang="less">
  .store-card {
  margin-bottom: 10px;
    .banner-item{
      float: left;
      margin-right: 20px;
      text-align: center;
    }
    .change-banner-item{
      margin: 20px auto;
    }
    .add-banner{
      vertical-align: middle;
      margin-top: 50px;
      margin-left: 10px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      margin-bottom: 0px ! important;
    }
}
 
</style>
<template>
  <div>
    <el-card class="store-card">
      <div slot="header" class="clearfix">
        <span>店铺logo</span>
      </div>
      <Upload2 v-model="form.store_logo" :attrs="{listType:'picture-card',limit:1,hideAdd:true}"></Upload2>
    </el-card>
    <el-card class="store-card">
      <div slot="header" class="clearfix">
        <span>店铺banner</span>
      </div>
      <div>
        <template v-for="(item,index) in form.store_banners">
          <div class="banner-item">
            <Upload2 v-model="item.img" :attrs="{listType:'picture-card',limit:1,hideAdd:true}"></Upload2>
            <el-button class="change-banner-item" size="small" type="primary" @click="showBannerItem(index)">{{item.goods_id?'修改商品':'添加商品'}}</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" circle @click="deleteBannerItem(index)"></el-button>
          </div>
        </template>
        <el-button class="add-banner" type="success" @click="addBanner()" v-show="form.store_banners.length<5">添加banner</el-button>
        <span class="clear-f"></span>
      </div>
    </el-card>
    <el-card class="store-card">
      <div slot="header" class="clearfix">
        <span>店铺宣传图</span>
      </div>
      <Upload2 v-model="form.store_intro" :attrs="{listType:'picture-card',multiple:true,hideleave:true}"></Upload2>
    </el-card>
    <div style="padding-left: 20px;">
      <el-button style="width: 140px;" type="primary" @click="submit">确认修改</el-button>
      <el-button @click="refresh">重置</el-button>
    </div>
    <BannerItem @chose-item="choseBannerGoods" ref="bannerItem"></BannerItem>
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload2 from '~/components/utils/upload2'
import BannerItem from '~/components/frame-comp/store/banner-item'

export default {
  props: [],
  components: { Upload2, BannerItem },
  data() {
    return {
      util: util,
      form: {
        store_logo: [],
        store_banners: [],
        store_intro: [],
        id: '',
      }
    }
  },

  methods: {
    refresh(){
      this.getStoreInfo();
    },
    submit() {
      let self = this;
      for (let item of self.form.store_banners) {
        if (item.img.length == 0) {
          util.message.error('banner图不能为空！')
          return
        }
      }


      let store_logo = util.getUrlPathKey(self.form.store_logo ? self.form.store_logo[0].url : '');
      let store_intro = util.filterData(self.form.store_intro, (d) => { return util.getUrlPathKey(d.url) }).toString();
      let store_banners = JSON.stringify(util.filterData(self.form.store_banners, {
        goods_id: (d) => d.goods_id,
        goods_name: (d) => d.goods_name,
        img: (d) => util.getUrlPathKey(d.img[0].url)
      }));
      let params = {
        store_logo: store_logo,
        store_intro: store_intro,
        store_banners: store_banners
      }
      if (self.form.id) params.id = self.form.id
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/store/info/add",
        data: JSON.stringify(params),
        success: (res) => {
          self.util.message.success('编辑修改成功！');
        }
      })
    },
    choseBannerGoods(index, row) {
      let goods_id = row.id;
      let goods_name = row.name;
      let store_banners = this.form.store_banners;
      store_banners[index].goods_id = goods_id;
      store_banners[index].goods_name = goods_name;
      this.$set(this.form, 'store_banners', store_banners)

    },
    deleteBannerItem(index) {
      this.form.store_banners.splice(index, 1)
    },
    addBanner() {
      this.form.store_banners.push({
        goods_id: '',
        goods_name: '',
        img: [],
      })
    },
    showBannerItem(index) {
      this.$refs['bannerItem'].show(index);
    },
    getStoreInfo() {
      let self = this;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/store/index",
        success: (res) => {
          if (res.code == 200) {
            let d = res.data;
            if (!d) {} else {
              self.$set(self.form, 'store_logo', [{ url: d.store_logo }]);
              self.$set(self.form, 'store_intro', util.filterData(d.store_intro, (d) => { return { url: d } }));
              self.$set(self.form, 'id', d.id);
              self.$set(self.form, 'store_banners', util.filterData(d.store_banners, {
                goods_id: (d) => d.goods_id,
                goods_name: (d) => d.goods_name,
                img: (d) => [{ url: d.img }]
              }));
            }
          }
        }
      })
    },
  },
  mounted() {
    this.getStoreInfo();
  },
  computed: {},
  head: {},
  layout: 'frame'
}
</script>