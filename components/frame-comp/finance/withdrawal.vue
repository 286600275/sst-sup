<style lang="less"> .bank-add-title {
  line-height: 30px;
  font-size: 16px;
}
.withdrawal-code-input{
  width: 342px;
}
</style>
<template>
  <div>
    <el-dialog @close="form1Close" width="800px" title="提现" :visible.sync="dialogVisible" top="8vh" :close-on-click-modal="false">
      <el-form class="form" label-width="100px" ref="form" :model="form" :rules="formRules">
        <el-form-item label="提现银行卡" prop="bankcard">
          <el-select ref="expressSelect" filterable placeholder="请选择" v-model="form.bankcard">
            <el-option v-for="item in bankCardList" :key="item.id" :label="item|bankCardShow2" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现金额" prop="cache">
          <el-input v-model="form.cache"></el-input>
        </el-form-item>
        <!-- <el-form-item label="提现密码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="submit" type="primary" style="width: 120px;">下一步</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog @close="form2Close" width="600px" title="输入验证码" :visible.sync="dialogVisible2" top="8vh" :close-on-click-modal="false">
      <el-form class="form" label-width="100px" ref="form2" :model="form2" :rules="formRules2">
        <el-form-item label="手机号码" prop="mobile">
          <el-input disabled v-model="form2.mobile"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input class="withdrawal-code-input" v-model="form2.code"></el-input>
          <el-button class="code-btn" type="primary" @click="getWithdrawalPhoneCode" :disabled="withdrawalCodeDisabled">{{withdrawalPhoneCodeText}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit2" type="primary" style="width: 120px;">完成</el-button>
          <el-button @click="dialogVisible2=false">取消</el-button>
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
    this.formDefault = {
      bankcard: '',
      cache: '',
    };
    this.formDefault2 = {
      mobile: this.$store.getters['username'],
      code: "",
      verification_key: "",
    };
    return {
      util: util,
      dialogVisible: false,
      dialogVisible2: false,
      logisticsCompany: [],
      orderId: '',
      type: '',
      form: util.clone(this.formDefault),
      formRules: {
        bankcard: [Object.assign({}, util.c.rules.defaultRequired, { trigger: 'change' })],
        cache: [Object.assign({}, util.c.rules.defaultRequired, { trigger: 'blur', message: '提现金额不能为0' }), util.c.rules.defaultRequired, {
          pattern: util.c.regexp.priceRegExp,
          message: "金额格式错误",
          trigger: "blur"
        }, {
          validator: function(rule, value, callback) {
            let cache = parseInt(value);
            if (cache < 100) {
              callback(['提现金额不能小于100'])
            } else {
              callback([]);
            }
          },
          trigger: "blur"
        }],
        code: [{
          required: true,
          message: util.c.tip.required,
          trigger: 'blur',
        }, {
          pattern: util.c.regexp.expressCodeRegExp,
          message: util.c.tip.expressCodeErrorFormat,
          trigger: "blur"
        }],
      },
      // 倒计时
      withdrawalCodeSendSeconds: 60,
      withdrawalCodeInterval: null,
      withdrawalCodeSending: false,
      form2: util.clone(this.formDefault2),
      formTemp: {},
      formRules2: {
        mobile: [{
          required: true,
          message: util.c.tip.required
        }, {
          pattern: util.c.regexp.phoneRegExp,
          message: util.c.tip.phoneErrorFormat,
          trigger: "blur"
        }],
        code: [{
          required: true,
          message: util.c.tip.required,
          trigger: 'blur',
        }],
      },
      // 银行卡
      bankCardList: [],
    }
  },
  filters: {
    bankCardShow2(item) {
      let bankName = item.bank_name;
      let bankNumber = item.card_number;
      bankNumber += "";
      let hideL = bankNumber.length - 6;
      return bankName + " " + bankNumber.substr(hideL);
    }
  },
  methods: {
    form1Close() {
      this.$refs['form'].resetFields();
    },
    form2Close() {
      this.$refs['form2'].resetFields();
    },
    submit() {
      let self = this;
      self.formTemp = util.clone(self.form);
      self.$refs['form'].validate((valid) => {
        if (valid) {
          self.dialogVisible = false;
          self.$nextTick(function() {
            setTimeout(function() {
              self.dialogVisible2 = true;
            }, 200)
          })
        }
      })
    },
    submit2() {
      let self = this;
      self.$refs['form2'].validate((valid) => {
        if (valid) {
          util.ajax({
            type: "post",
            url: util.ajaxPath() + "/cash/save",
            data: JSON.stringify({
              verification_key: self.form2.verification_key,
              verification_code: self.form2.code,
              mobile: self.form2.mobile,
              card_id: self.formTemp.bankcard,
              cash_amount: self.formTemp.cache
            }),
            success: function(res) {
              if (res.status == "success" || res.access_token) {
                util.message.success('提现申请成功！');
                self.dialogVisible2 = false;
              }
              if (res.status == "error") {
                util.message.error(res.message)
                return true;
              }
            }
          });
        }
      })
    },
    show(row) {
      let self = this;
      self.dialogVisible = true;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/card/index",
        success: function(res) {
          if (res.status == "success") {
            self.bankCardList = res.data;
          } else {}
        }
      })
    },
    getWithdrawalPhoneCode() {
      let self = this;
      // 进行操作 
      util.ajax({
        loadingClear_: true,
        url: util.ajaxPath() + "/oauth/register/sms",
        type: "post",
        data: JSON.stringify({
          mobile: self.form2.mobile
        }),
        success: function(res) {
          if (res.status == "success") {
            util.message.success("验证码发送成功");
            self.form2.verification_key = res.verification_key
          }
        }
      });
      // 倒计时
      self.withdrawalCodeSending = true;
      self.withdrawalCodeSendSeconds = 59;
      self.withdrawalCodeInterval = setInterval(function() {
        self.withdrawalCodeSendSeconds--;
        if (self.withdrawalCodeSendSeconds == 0) {
          clearInterval(self.withdrawalCodeInterval);
          self.withdrawalCodeSending = false;
        }
      }, 1000)
    },
  },
  mounted() {},
  computed: {
    withdrawalCodeDisabled() {
      return this.withdrawalCodeSending || (!util.c.regexp.phoneRegExp.test(this.form2.mobile))
    },
    withdrawalPhoneCodeText() {
      let self = this;
      if (self.withdrawalCodeSending) {
        return self.withdrawalCodeSendSeconds + " s";
      } else {
        return "获取验证码"
      }
    },
    userPhone() {
      this.$store.getters['username']
    }
  },
  head: {}
}
</script>