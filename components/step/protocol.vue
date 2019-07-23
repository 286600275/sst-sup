<style lang="less">
.bank-add-title {
  line-height: 30px;
  font-size: 16px;
}

.pdf-iframe {
  width: 100%;
  height: 800px;
}
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" class="large-dialog" title="查看协议" :visible.sync="dialogVisible" top="5vh">
      <template v-if="!pdfIframe">
        <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" width="100%" height="800">
          <param name="SRC" value="/file/供应商系统服务协议.pdf">
          <embed width="100%" height="800" fullscreen="yes" src="/file/供应商系统服务协议.pdf">
          <noembed></noembed>
          </embed>
        </object>
      </template>
      <template v-else>
        <iframe class="pdf-iframe" src="/file/供应商系统服务协议.pdf"></iframe>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  components: {},
  props: [],
  data() {
    let self = this;
    return {
      util: util,
      dialogVisible: false,
      pdfIframe: false,
    }
  },
  methods: {
    dialogClose() {},
    show(row) {
      let self = this;
      self.dialogVisible = true;
    },
    checkBrowser() {
      let self = this;
      var is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
      if (isChrome() && is360) {
        self.pdfIframe = true;
      }

      function isChrome() {
        var ua = navigator.userAgent.toLowerCase();
        return ua.indexOf("chrome") > 1;
      }
      //测试mime
      function _mime(option, value) {
        var mimeTypes = navigator.mimeTypes;
        for (var mt in mimeTypes) {
          if (mimeTypes[mt][option] == value) {
            return true;
          }
        }
        return false;
      }
    },
  },
  mounted() {
    this.checkBrowser();
  },
  computed: {},
  head: {}
}
</script>