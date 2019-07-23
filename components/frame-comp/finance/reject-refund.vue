<style lang="less">// 
.reject-content-input textarea{
  line-height: 29px;
  word-break: break-all;
 }
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" width="600px" :title="'拒绝退款'" :visible.sync="dialogVisible" top="8vh">
      <el-form class="form" label-width="90px" ref="form" :model="form" :rules="formRules">
        <el-form-item label="拒绝理由" prop="content">
          <el-input class="reject-content-input" :autosize="{ minRows: 4, maxRows: 8}" type="textarea" v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary" style="width: 120px;">提交</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
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
      dialogVisible: false,
      form: {
        content: ""
      },
      formRules: {
        content: [{ required: true, message: util.c.tip.required, trigger: 'input' }],
      },
      id: '',
    }
  },
  methods: {
    submit() {
      let self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          util.ajax({
            type: "POST",
            url: util.ajaxPath() + "/refund/check",
            data: JSON.stringify({
              id: self.id,
              finance_check: 2,
              refund_reason: self.form.content,
            }),
            success: function(res) {
              if (res.status == "success") {
                util.message.success('操作成功');
                self.dialogVisible = false;
                self.$emit('operator-success')
              }
            }
          })
        }
      })
    },
    show(row, type) {
      let self = this;
      self.dialogVisible = true;
      self.id = row.id;
    },
    dialogClose() {
      this.$refs['form'].resetFields();
    }
  },
  mounted() {},
  computed: {},
  head: {}
}
</script>