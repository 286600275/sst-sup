<style lang="less"> .upload-box{
  line-height:0px;
}
.hide-add{
  &>.el-upload {
    display: none;
  }
}
[hideadd] .el-list-leave-active{
  position: absolute;
}
[hideleave] .el-list-leave-active{
  display: none;
}
// is sku
  .is-sku{
    .el-upload-list--picture-card .el-upload-list__item{
      margin: 0;
    }
    .el-upload--picture-card i{
      line-height: 70px;    
      vertical-align: top;
    }
    .el-upload--picture-card{
      width: 70px;
      height: 70px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: 70px;
      height: 70px;
    }
    .el-upload-list--picture-card .el-progress{
      width: 70px;
    }
    .el-progress-circle{
      width: 70px ! important;
      height: 70px ! important;
    }
  }
.invoice{
   .el-upload-list--picture-card .el-upload-list__item{
      margin-right: 20px;
    }
    .el-upload--picture-card i{
      line-height: 300px;    
      vertical-align: top;
    }
    .el-upload--picture-card{
      width: 300px;
      height: 300px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width: 300px;
      height: 300px;
    }
    .el-upload-list--picture-card .el-progress{
      width: 300px;
    }
    .el-progress-circle{
      width: 300px ! important;
      height: 300px ! important;
    }
}
</style>
<template>
  <div>
    <el-upload accept="image/*" class="upload-box" :class="{'invoice':attrs.invoice,'is-sku':attrs.isSku,'hide-add':hideAdd}" v-bind="attrs" :list-type="attrs.listType||'picture'" :on-preview="handlePreview" :on-remove="handleRemove" :on-error="handleUploadError" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :file-list="value" :before-remove="handleBeforeRemove" :action="uploadConfig.action" :multiple="multiple" name="img" :data="uploadData" :headers="headers" :on-success="handleUpload">
      <template v-if="attrs.listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else>
        <el-button size="small" type="primary">点击上传</el-button>
      </template>
    </el-upload>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  components: {},
  props: {
    value: {
      type: Array,
      default: (() => { return [] })
    },
    propName: [String, Number],
    attrs: {
      type: Object,
      default: (() => { return {} })
    },
    uploadFolder: {
      type: String,
      default: "good"
    }
  },
  data() {
    return {
      util: util,
      isProcessing: false,
      uploadConfig: {
        action: util.ajaxPath() + "/image/upload",
      },
      uploadCount: 0,
      uploadFiles: [],
    }
  },
  methods: {
    // // 自定义图片上传  beforeUpload拦截
    // customUpload(file) {
    //   let self = this;
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = function(e) {
    //     if (file.size > 500 * 1024) {
    //       util.message.error("图片过大请调整尺寸或压缩后上传（<500kb）");
    //       return;
    //     }
    //     util.ajax({
    //       _notLoading: true,
    //       type: "POST",
    //       data: {
    //         type: "upload/supplier/" + self.uploadFolder,
    //         width: 400,
    //         height: 400,
    //       },
    //       dataType: "text",
    //       contentType: "application/x-www-form-urlencoded",
    //       url: util.ajaxPath() + "/image/upload",
    //       success: function(res) {
    //         if (res.status == "error") {
    //           util.message.error("图片过大请调整尺寸或压缩后上传（<500kb）");
    //           return true;
    //         }
    //         let url = util.getUrlByKey(res);
    //         let fileObj = {
    //           url: url,
    //           uid: file.uid,
    //           key: res,
    //         };
    //         self.fileList.push(fileObj)
    //         self.$emit('input', self.fileList);
    //       },
    //       error: function(e) {
    //         // util.message.error()
    //       },
    //       complete: function() {
    //         this.isProcessing = false;
    //       }
    //     });
    //   }
    // },
    handleBeforeUpload(file) {
      if (util.c.regexp.imgUrlRegExp.test(file.name)) {} else {
        util.message.error('图片文件格式错误！');
        return false;
      }
      this.isProcessing = true;
      this.uploadFiles[this.uploadCount] = file.uid; //记录位置
      this.uploadCount++;
    },
    handleUpload(response, file, fileList) {
      let self = this;
      let url = util.getUrlByKey(response);
      let fileObj = {
        url: url,
        uid: file.uid,
        key: response,
      };
      let index = self.uploadFiles.indexOf(file.uid);
      self.uploadFiles.splice(index, 1, fileObj);
      self.uploadCount--;
      // 批量上传文件全部完成
      if (self.uploadCount == 0) {
        let uploadFiles = util.clone(self.uploadFiles);
        let fileList = util.clone(self.fileList);
        self.$emit('input', fileList.concat(uploadFiles));
        self.uploadFiles = [];
      }
      this.isProcessing = false;
    },
    handleBeforeRemove(e) {
      this.isProcessing = true;
    },
    handleRemove(file, fileList) {
      let self = this;
      self.isProcessing = false;
      self.$emit('input', fileList);
    },
    // 图片预览
    handlePreview(file, fileList) {
      util.triggerEvent('mainComponentAction', {
        ref: "imagePreview",
        methodsName: "show",
        params: file.url
      })
    },
    handleExceed() {
      util.message.error("图片上传超出个数限制");
    },
    handleUploadError(err, file, fileList) {
      this.isProcessing = false;
      util.message.error("图片上传失败");
    },
  },
  mounted() {},
  computed: {
    hideAdd() {
      return this.attrs.hideAdd && (this.isProcessing || this.fileList.length >= (this.attrs.limit || 1))
    },
    multiple() {
      return this.attrs.multiple ? true : false;
    },
    fileList() {
      return this.value;
    },
    uploadData() {
      let self = this;
      return {
        type: "upload/supplier/" + self.uploadFolder,
        // width: 400,
        // height: 400,
      }
    },
    headers() {
      return {
        "Authorization": "Bearer " + this.$store.getters.token
      }
    }
  },
  head: {}
}
</script>