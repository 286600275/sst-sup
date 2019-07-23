<style lang="less">
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" width="600px" :title="(type=='add'?'添加':'编辑')+'编辑客服'" :visible.sync="dialogVisible" top="8vh">
      <el-form class="form" label-width="100px" ref="form" :model="form" :rules="formRules">
        <el-form-item label="客服类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">微信客服</el-radio>
            <el-radio :label="2">电话客服</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="form.type=='1'?'客服微信号':'客服电话号'" prop="number">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="info">
          <el-input v-model="form.info"></el-input>
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
    let self = this;
    return {
      util: util,
      dialogVisible: false,
      type: 'add',
      form: {
        id: '',
        number: '',
        type: 1,
        info: ''
      },
      originForm: {},
      formRules: {
        number: [util.c.rules.defaultRequired, {
          trigger: 'blur',
          validator: function(rule, value, callback, source, options) {
            var errors = [];
            if (self.form.type == 2) { //电话
              if (!util.c.regexp.telRegExp.test(value)) {
                callback([util.c.tip.telErrorFormat])
              }
            }
            callback(errors);
          }
        }],
        // info: [util.c.rules.defaultRequired],
      }
    }
  },
  methods: {
    submit() {
      let self = this;
      let form = util.clone(self.form);
      if (!form.id) {
        delete form.id
      }
      self.$refs['form'].validate((valid) => {
        if (valid) {
          util.ajax({
            type: "POST",
            url: util.ajaxPath() + "/custom/create",
            data: JSON.stringify(form),
            success: function(res) {
              if (res.status == "success") {
                self.$emit('customer-edit-success');
                self.dialogVisible = false;
                util.message.success('客服添加/编辑成功！');
              }
            }
          })
        }
      });
    },
    show(row, type) {
      let self = this;
      if (row) {
        self.type = "edit";
        self.form = util.clone(row);
      } else {
        self.type = "add";
        self.$set(self.form, 'type', type || 1)
      }
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