<style lang="less"> .bank-add-title {
  line-height: 30px;
  font-size: 16px;
}
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" width="800px" title="添加银行卡" :visible.sync="dialogVisible" top="8vh" :close-on-click-modal="false">
      <el-form label-width="130px" ref="form" :model="form" :rules="formRules">
        <!-- 持卡人 -->
        <el-form-item label="持卡人" prop="real_name">
          <el-input :disabled="type=='show'" v-model="form.real_name"></el-input>
        </el-form-item>
        <!-- 银行卡号 -->
        <el-form-item label="银行卡号" prop="card_number">
          <el-input :disabled="type=='show'" v-model="form.card_number"></el-input>
        </el-form-item>
        <el-form-item label="银行" prop="bank_name">
          <el-select :disabled="type=='show'" v-model="form.bank_name">
            <el-option v-for="item in bankList" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form label-width="130px" ref="form2" :model="form2">
        <!-- 银行 -->
        <el-form-item v-if="type=='add'">
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
    let self = this;
    return {
      util: util,
      dialogVisible: false,
      type: "add",
      form: {
        real_name: "",
        card_number: "",
        bank_name: "",
      },
      bankList: [],
      formRules: {
        real_name: [{ required: true, message: "必填项", trigger: 'blur' }],
        card_number: [{ required: true, message: "必填项", trigger: 'blur' }, {
          pattern: util.c.regexp.bankCardRegExp,
          message: util.c.tip.bankCardErrorFormat,
          trigger: "blur"
        }],
        bank_name: [{ required: true, message: "必填项", trigger: 'blur' }],
      },
      form2: {},
    }
  },
  methods: {
    dialogClose() {},
    submit() {
      let self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          util.ajax({
            type: "POST",
            url: util.ajaxPath() + "/card/save",
            data: JSON.stringify({
              card_number: self.form.card_number,
              bank_name: self.form.bank_name,
              real_name: self.form.real_name,
            }),
            success: function(res) {
              if (res.status == "success") {
                util.message.success('银行卡添加成功');
                self.$emit('bank-card-add-success');
                self.dialogVisible = false;
              }
            }
          })
        }
      })
    },
    show(row) {
      let self = this;
      self.dialogVisible = true;
      self.$nextTick(_ => {
        self.$refs['form'].resetFields();
        if (row) {
          self.type = "show";
          self.form = {
            real_name: row.real_name,
            card_number: row.card_number,
            bank_address: row.bank_address,
            bank_name: row.bank_name,
            card_type: row.card_type_name,
          }
        } else {
          self.type = "add";
          self.$nextTick(_ => {
            self.form = {
              real_name: "",
              card_number: "",
              bank_address: "",
              bank_name: "",
            }
          })
        }
      })
    },
    /**
     * 获取支持的银行卡号的列表 
     */
    getBankCardList() {
      let self = this;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/card/banklist",
        data: JSON.stringify({}),
        success: function(res) {
          if (res.status == "success") {
            self.bankList = res.data;
          }
        }
      })
    },
  },
  mounted() {
    this.getBankCardList();
  },
  computed: {},
  head: {}
}
</script>