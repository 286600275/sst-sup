<style lang="less">
</style>
<template>
  <div>
    <el-dialog width="680px" title="发票待开" :visible.sync="dialogVisible" top="8vh">
      <el-form class="form" label-width="0px" ref="form" :model="form" :rules="formRules">
        <el-form-item prop="imgs">
          <Upload2 ploadFolder="order-invoice" :attrs="{invoice:true,hideAdd:true,limit:2,listType:'picture-card'}" v-model="form.imgs"></Upload2>
        </el-form-item>
        <div style="padding-left: 180px">
          <el-button @click="submit" type="primary" style="width: 120px;">提交</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload2 from '~/components/utils/upload2'
export default {
  components: { Upload2 },
  props: [],
  data() {
    return {
      util: util,
      dialogVisible: false,
      form: {
        imgs: [],
      },
      formRules: {
        imgs: [{ required: true, message: "请至少上传一张图片", trigger: 'change', type: "array" }]
      }
    }
  },
  methods: {
    submit() {
      // this.$refs['']
    },
    show(row, type) {
      let self = this;
      self.dialogVisible = true;
    }
  },
  mounted() {},
  computed: {},
  head: {}
}
</script>