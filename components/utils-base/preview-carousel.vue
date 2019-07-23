<style lang="less">
.main-preview-dialog {
  .el-dialog {
    .el-dialog__body {
      padding: 0px;
    }
    width: 100% ! important;
    max-width: 1024px;
    box-shadow: none;
    background: transparent;
    .el-dialog__headerbtn {
      top: -10px;
      right: -30px;
      .el-dialog__close {
        color: #fff;
        font-size: 40px;
      }
    }
    .el-dialog__title {
      display: none;
    }
    .el-carousel__container {
      height: 100%;
    }
  }
}
.main-preview-carousel {
  .el-carousel__arrow {
    height: 60px;
    width: 60px;
    font-size: 30px;
  }
  .el-carousel__indicators {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 0px;
  }
}
.carousel-container {
  .carousel-show-img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
<template>
  <div>
    <el-dialog :visible.sync="dialogVisible_previewCarousel" top="50px" :show-close="showClose" @closed="imgs=[]">
      <el-carousel :style="'height:'+carouselHeight+'px'" :autoplay="autoplay" class="main-preview-carousel" indicator-position="outside" :loop="false">
        <el-carousel-item v-for="(item,index) in imgs" :key="index">
          <div class="carousel-container">
            <img class="carousel-show-img" :src="item">
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: [],
  data() {
    return {
      dialogVisible_previewCarousel: false,
      imgs: [],
      autoplay: true,
      showClose: true,
      carouselHeight: 600
    }
  },
  methods: {
    show(opts) {
      this.imgs = opts.imgs;
      this.dialogVisible_previewCarousel = true;
      this.autoplay = !!opts.autoplay;
    }
  },
  mounted() {
    var self = this;
    self.carouselHeight = Math.max(300, util.getViewSize().height - 130)
    util.windowResize(function() {
      self.carouselHeight = Math.max(300, util.getViewSize().height - 130)
    });
  },
  computed: {},
  head: {}
}
</script>