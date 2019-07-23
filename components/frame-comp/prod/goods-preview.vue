<style lang="less">
.preview-bg {
  background: url("~assets/img/preview-iphoneX.png");
  background-size: contain;
  width: 365px;
  height: 730px;
  border-top: 1px solid #fff;

  .preview-con {
    position: relative;
    margin: 20px auto;
    border-radius: 30px;
    width: 316px;

    .preview-scroll {
      margin: 20px auto;
      height: 690px;
      border-radius: 30px;
      overflow-y: auto;
      padding-bottom: 50px;

      .price {
        font-size: 18px;
        color: #FC4C4C;
        padding: 12px 0px 12px 10px;
      }

      .name {
        color: #000;
        font-size: 13px;
        display: block;
        width: 65%;
        margin-left: 15px;
      }

      .share-icon {
        background: url("~assets/img/preview-share.png");
        background-size: cover;
        display: block;
        height: 37px;
        width: 62px;
        height: 26px;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }

    .preview-scroll::-webkit-scrollbar {
      display: none
    }
  }
}

.top-img {
  width: 190px;
  height: 190px;
  display: block;
  margin: 80px auto;
}

.middle {
  background: url("~assets/img/preview-mid.png");
  background-size: cover;
  height: 37px;
  margin: 10px auto
}

.detail-html {
  img {
    width: 100%;
    display: block;
  }
}

.bottom {
  width: 316px;
  height: 52px;
  background: url("~assets/img/preivew-bottom.png");
  background-size: cover;
  position: absolute;
  border-radius: 0 0 30px 30px;
  bottom: 0px;
}
</style>
<template>
  <div>
    <el-dialog width="400px" title="商品预览" :visible.sync="dialogGoodsPreviewVisible" top="8vh">
      <div id="goodPreview" class="preview-bg">
        <div class="preview-con">
          <div class="preview-scroll">
            <div>
              <img class="top-img" :src="topImgSrc">
            </div>
            <div class="price">￥{{price}}</div>
            <div style="position: relative;">
              <div class="name">{{name }} <span class="share-icon"></span>
              </div>
            </div>
            <div class="middle"></div>
            <div class="detail-html">
              <template v-for="item in detail"> <img :src="item">
              </template>
            </div>
          </div>
          <div class="bottom"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  components: {},
  props: [],
  data() {
    return {
      util: util,
      dialogGoodsPreviewVisible: false,
      topImgSrc: "",
      price: "",
      detail: [],
      name: "",
    }
  },
  methods: {
    show(params) {
      let self = this;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/goods/show/" + params.id,
        success: function(res) {
          if (res.status == "success") {
            self.dialogGoodsPreviewVisible = true;
            self.topImgSrc = res.data.image;
            self.detail = res.data.detail;
            self.price = res.data.price;
            self.name = res.data.name;
          }
        }
      })
    }
  },
  mounted() {},
  computed: {},
  head: {}
}
</script>