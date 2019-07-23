<style lang="less">
@import "~assets/css/base.less";
.my-main {
  position: relative;
  margin-bottom: 40px;
  background: @bg1;
}
</style>
<template>
  <div class="my-main" :style="'min-height:'+minHeight+'px'">
    <slot></slot>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: ['mounted'],
  components: {},
  data() {
    return {
      util: util,
      minHeight: 500,
    }
  },
  created() {},
  methods: {},
  mounted() {
    let self = this;
    self.minHeight = util.getViewSize().height - 90;
    util.windowResize(function() {
      self.minHeight = util.getViewSize().height - 90;
    })
  },
  computed: {}
}
</script>