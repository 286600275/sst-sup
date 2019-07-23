<style></style>
<template>
  <div>
    <PreviewCarousel ref="previewCarousel"></PreviewCarousel>
    <GoodsPreview ref="goodsPreview"></GoodsPreview>
    <ImagePreview ref="imagePreview"></ImagePreview>
    <!-- 公共/单例 组件 -->
  </div>
</template>
<script>
import PreviewCarousel from '~/components/utils-base/preview-carousel.vue'
import GoodsPreview from '~/components/frame-comp/prod/goods-preview.vue'
import ImagePreview from '~/components/utils/image-preview.vue'
import util from '~/utils/common'
import { Message } from 'element-ui';
export default {
  props: [],
  components: { PreviewCarousel, GoodsPreview, ImagePreview },
  created() {},
  data() {
    return {}
  },
  beforeMounte() {
    String.prototype.trim = function() {
      return this.replace(/(^\s*)|(\s*$)/g, '');
    };
    String.prototype.replaceAll = function(s1, s2) {
      let str = this;
      let str2 = str.split(s1);
      return str2.join(s2);
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        Message.closeAll()
      },
    }
  },
  methods: {},
  mounted() {
    let self = this;
    util.addEvent('mainComponentAction', function({ ref, methodsName, params } = {}) {
      try {
        self.$refs[ref][methodsName](params)
      } catch (e) { console.log('mainComponentAction error', e) }
    })
  },
  computed: {},
  head: {}
}
</script>