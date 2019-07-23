<style lang="less"> .hide-add{
  &>.el-upload {
    display: none;
  }
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

</style>
<template>
  <div>
    <div>内部实际list</div> {{fileList}} <el-upload :class="{'is-sku':uploadProps.isSku,'hide-add':hideAdd}" v-bind="uploadProps" :list-type="listType||'picture'" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleUploadSuccess" :on-error="handleUploadError" :on-exceed="handleExceed" :before-upload="handleBeforeUpload" :file-list="fileList" :before-remove="handleBeforeRemove" :action="uploadConfig.action" :headers="uploadConfig.headers" :data="uploadConfig.data" :name="uploadConfig.name">
      <template v-if="listType=='picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-else>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </template>
    </el-upload>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  components: {},
  props: {
    propName: [String, Number],
    listType: String,
    uploadProps: {
      type: Object,
      default: (() => { return {} })
    },
  },
  data() {
    return {
      util: util,
      isProcessing: false,
      fileList: [],
      uploadConfig: {
        action: util.ajaxPath() + "/image/upload",
        name: "img",
        data: {
          type: "upload/supvue/images",
          width: 400,
          height: 400,
        },
        headers: { "Authorization": "Bearer " + this.$store.getters.token },
      },
    }
  },
  methods: {
    getFileObject(filename) {
      return {
        uid: new Date().getTime(),
        url: filename,
        filename: util.getFileName(filename),
      }
    },
    setUploadDefaultList(fileList) {
      this.fileList = fileList;
    },
    // 自定义图片上传  beforeUpload拦截
    customUpload(file) {
      let self = this;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        util.ajax({
          _notLoading: true,
          type: "POST",
          data: {
            img: reader.result,
            type: "upload/supplier/good",
            width: 400,
            height: 400,
          },
          dataType: "text",
          contentType: "application/x-www-form-urlencoded",
          url: util.ajaxPath() + "/image/upload",
          success: function(res) {
            if (res.status == "error") {
              util.message.error("图片过大请调整尺寸或压缩后上传（<500kb）");
              return true;
            }
            self.fileList.push({
              url: res,
              filename: util.getFileName(res),
              uid: file.uid,
            })
            // 
            self.$emit('handleUploadSuccess', {
              prop: self.propName,
              fileList: util.clone(self.fileList),
            })
          },
          error: function() {},
          complete: function() {
            this.isProcessing = false;
          }
        });
      }
    },
    handleBeforeUpload(file) {
      this.customUpload(file);
      return false;
    },
    handleBeforeRemove(e) {
      this.isProcessing = true;
    },
    handleRemove(file, fileList) {
      let self = this;
      self.isProcessing = false;
      self.fileList = fileList;
      self.$emit('handleRemove', {
        prop: self.propName,
        fileList: util.clone(self.fileList),
      })
    },
    handlePreview(file, fileList) {
      util.triggerEvent('mainComponentAction', {
        ref: "imagePreview",
        methodsName: "show",
        params: file.url
      })
      // 图片预览
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
      return this.uploadProps.hideAdd && (this.isProcessing || this.thisUploadList.length >= 1)
    }
  },
  head: {}
}
</script>