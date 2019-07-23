<style lang="less">
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" width="600px" title="退货地址" :visible.sync="dialogVisible" top="8vh">
      <el-form class="form" label-width="100px" ref="form" :model="form" :rules="formRules">
        <el-form-item label="收货人" prop="refund_person">
          <el-input v-model="form.refund_person"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="refund_address">
          <el-input :autosize="{ minRows: 4, maxRows: 8}" type="textarea" v-model="form.refund_address"></el-input>
        </el-form-item>
        <el-form-item label="收货电话" prop="refund_phone">
          <el-input v-model="form.refund_phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary" style="width: 120px;" :disabled="submitDisabled">提交</el-button>
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
        id: "",
        refund_person: "",
        refund_address: "",
        refund_phone: ""
      },
      originForm: {},
      formRules: {
        refund_person: [util.c.rules.defaultRequired],
        refund_address: [util.c.rules.defaultRequired],
        refund_phone: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.phoneRegExp,
          message: util.c.tip.phoneErrorFormat,
          trigger: "blur"
        }],
      }
    }
  },
  methods: {
    submit() {
      let self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          util.ajax({
            type: "POST",
            url: util.ajaxPath() + "/refund/address/add",
            data: JSON.stringify(self.form),
            success: function(res) {
              if (res.status == "success") {
                self.$emit('address-edit-success');
                self.dialogVisible = false;
                util.message.success('退货地址修改成功！');
              }
            }
          })
        }
      });
    },
    show(returnAddress) {
      let self = this;
      self.form = returnAddress
      self.originForm = util.clone(returnAddress);
      self.dialogVisible = true;
    },
    dialogClose() {
      this.$refs['form'].resetFields();
    },
  },
  mounted() {},
  computed: {
    submitDisabled() {
      return (JSON.stringify(this.originForm) == JSON.stringify(this.form));
    }
  },
  head: {}
}
</script>