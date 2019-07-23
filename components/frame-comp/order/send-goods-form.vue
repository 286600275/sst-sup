<style lang="less">
</style>
<template>
  <div>
    <el-dialog width="600px" title="发货单" :visible.sync="dialogVisible" top="8vh">
      <el-form class="form" label-width="100px" ref="form" :model="form" :rules="formRules">
        <el-form-item label="快递公司" prop="express_id">
          <el-select ref="expressSelect" filterable placeholder="请选择" v-model="form.express_id">
            <el-option v-for="item in logisticsCompany" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" prop="express_code">
          <el-input v-model="form.express_code"></el-input>
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
    this.formDefault = {
      express_id: '',
      express_code: '',
    };
    return {
      util: util,
      dialogVisible: false,
      form: util.clone(this.formDefault),
      row: {},
      logisticsCompany: [],
      orderId: '',
      type: '',
      formRules: {
        express_id: [Object.assign({}, util.c.rules.defaultRequired, { trigger: 'change' })],
        express_code: [{
          required: true,
          message: util.c.tip.required,
          trigger: 'blur',
        }, {
          pattern: util.c.regexp.expressCodeRegExp,
          message: util.c.tip.expressCodeErrorFormat,
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
          let selectedLabel = self.$refs['expressSelect'].selectedLabel;
          let params = {
            express_id: self.form.express_id,
            express_code: self.form.express_code,
            express_name: selectedLabel,
            order_id: self.orderId,
            id: self.form.id || '',
            refund_id: self.row.refund_id || "",
            is_store: (self.row.is_store || self.row.is_store === 0) ? self.row.is_store : self.isStore
          }
          if (self.isStore) params.is_store = self.isStore
          if (self.isRefund) params.is_refund = self.isRefund
          util.ajax({
            type: "POST",
            url: util.ajaxPath() + "/order/express",
            data: JSON.stringify(params),
            success: function(res) {
              if (res.status == "success") {
                util.message.success('发货单填写完毕！');
                self.dialogVisible = false;
                self.$emit('action-success');
              }
            }
          })
        }
      });
    },
    show(row, type) {
      let self = this;
      self.dialogVisible = true;
      self.row = row || {};
      self.orderId = row.id;
      self.type = type;
      util.ajax({
        type: "POST",
        data: JSON.stringify({
          order_id: self.orderId,
          is_store: (row.is_store || row.is_store === 0) ? row.is_store : self.isStore,
          refund_id: row.refund_id || "",
        }),
        url: util.ajaxPath() + "/order/express/info",
        success: function(res) {
          if (res.status == "success") {
            if (res.data.express_id) {
              self.form = {
                express_id: res.data.express_id,
                express_code: res.data.express_code,
                id: res.data.id,
                is_refund: self.isRefund
              }
            } else {
              self.form = util.clone(self.formDefault);
            }
            self.$nextTick(function() {
              self.$refs['form'].clearValidate();
            });
          }
        }
      })
    },
    setLogisticsCompany() {
      let self = this;
      let logisticsCompany = self.$store.getters['order/logisticsCompany'];
      if (logisticsCompany) {
        self.logisticsCompany = logisticsCompany;
      } else {
        util.ajax({
          type: "GET",
          url: util.ajaxPath() + "/order/express/list",
          success: function(res) {
            if (res.status == "success") {
              self.$store.commit('order/updateLogisticsCompany', res.data)
              self.logisticsCompany = res.data;
            }
          }
        })
      }
    }
  },
  mounted() {
    this.setLogisticsCompany();
  },
  computed: {
    isStore() {
      switch (this.type) {
        case "retail":
          return 0
          break;
        case "wholesale":
          return 1
          break;
      }
      return "";
    },
    isRefund() {
      switch (this.type) {
        case "refund":
          return 3
          break;
      }
    }
  },
  head: {}
}
</script>