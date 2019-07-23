<style lang="less">
@import "~assets/css/base.less";
</style>
<template>
  <div>
    <div>test</div>
    <div> {{form}}</div>
    <Upload :defaultList="form[prop]" @handleRemove="handleRemove" @handleUploadSuccess="handleUploadSuccess" :ref="'upload_'+prop"></Upload>
    <el-input v-model="(form[prop]||[]).toString()"></el-input>
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload from '~/pages/test/upload.vue'
export default {
  components: { Upload },
  data() {
    return {
      prop: 'test',
      form: {},
    };
  },
  created() {},
  methods: {
    // 设置默认图片上传列表
    setDefaultUploadFileList(prop, list) {
      let self = this;
      let s = self.$refs['upload_' + self.prop];
      s.setUploadDefaultList(list);
    },
    handleRemove({ prop, fileList } = {}) {
      let form = JSON.parse(JSON.stringify(this.form));
      form[prop] = fileList;
      this.form = form;
    },
    handleUploadSuccess({ prop, fileList } = {}) {
      let form = JSON.parse(JSON.stringify(this.form));
      form[prop] = fileList;
      this.form = form;
    },
  },
  mounted() {
    this
    debugger;

    util.getUrlByKey("upload/supplier/good/eUavxbfN415Yc7iP");
    // let self = this;
    // let url = "http://shoushoutao.oss-cn-hangzhou.aliyuncs.com/upload%2Fsupplier%2Fimages%2Fbrand_logo%2FftEbfXW61vjMhphX?OSSAccessKeyId=LTAIQdv2Qukzlrt0&Signature=HwIaPwFi6WYNuNj%2BK6VTJFzWw1Y%3D&Expires=1868149921";
    // let test = [{
    //   filename: util.getFileName(url),
    //   url: url,
    //   id: 13,
    // }]
    // this.form = {
    //   test: test
    // };
    // self.setDefaultUploadFileList(self.prop, test);
  },
  computed: {}
};
</script>