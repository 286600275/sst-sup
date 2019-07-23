<style> .pdf-viewer {
  width: 100%;
}
.agree-aciton {
  margin-top: 50px;
}
.pdf-back{ 
  width: 100%;
  height: 801px;
  background: #f5f7fa;
  border-bottom: 1px solid #ddd;
}
#pdfObject{
  display: none;
}
.pdf-iframe{
  border:none;
  width: 100%;
  height:100%;
}
</style>
<template>
  <div>
    <el-card>
      <div class="pdf-back">
        <template v-if="!pdfIframe">
          <object id="pdfObject" classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" width="100%" height="800">
            <param name="SRC" value="/file/供应商系统服务协议.pdf">
            <embed width="100%" height="800" fullscreen="yes" src="/file/供应商系统服务协议.pdf">
            <noembed></noembed>
            </embed>
          </object>
        </template>
        <template v-else>
          <iframe class="pdf-iframe" src="/file/供应商系统服务协议.pdf"></iframe>
        </template>
      </div>
      <div class=" agree-aciton">
        <el-checkbox v-model="checked">是否同意以上合同并签约</el-checkbox>
      </div>
      <div>
        <el-button @click="step1_NextStep" :disabled="!checked" class="next-action" type="primary">下一步</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: [],
  components: {},
  created() {},
  data() {
    return {
      util: util,
      checked: false,
      pdfIframe: false,
    }
  },
  methods: {
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
    hidePdf() {
      var pdfObject = document.getElementById("pdfObject");
      if (pdfObject) pdfObject.style.display = "none";
    },
    step1_NextStep() {
      let self = this;
      util.ajax({
        url: util.ajaxPath() + "/user/join/create",
        type: "post",
        data: JSON.stringify({
          step_id: 1,
        }),
        success: function(res) {
          if (res.status == "success") {
            self.$emit('goStep', 2);
          }
          if (res.status == "error") {}
          //设置选项
        }
      })
    },
  },
  mounted() {
    let self = this;
    self.checkBrowser();
    $('html,body').animate({ scrollTop: (Math.floor(util.getViewSize().width / 10)) + 'px' }, 600);
    setTimeout(function() {
      document.getElementById("pdfObject").style.display = "block";
    }, 100)
  },
  computed: {},
  head: {}
}
</script>