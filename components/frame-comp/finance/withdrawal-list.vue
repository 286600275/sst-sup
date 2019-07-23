<style lang="less">
.bank-add-title {
  line-height: 30px;
  font-size: 16px;
}
</style>
<template>
  <div>
    <el-dialog width="800px" title="提现记录" :visible.sync="dialogVisible" top="8vh" :close-on-click-modal="false">
      <el-table size="small" :data="withdrawalList" border style="width: 100%">
        <el-table-column prop="created_at" label="提现申请时间" :formatter="util.tableRender('date','YYYY-MM-DD HH:mm:ss')">
        </el-table-column>
        <el-table-column prop="usersbank.card_number" label="提现卡号" :formatter="util.tableRender()" :show-overflow-tooltip="true" width="200px">
        </el-table-column>
        <el-table-column prop="cash_amount" label="提现金额" :formatter="util.tableRender()" width="100px">
        </el-table-column>
        <el-table-column prop="state" label="提现状态" :formatter="util.tableRender('withdrawalStatus')">
        </el-table-column>
      </el-table>
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
      withdrawalList: [],
    }
  },
  methods: {
    submit() {},
    show() {
      let self = this;
      self.dialogVisible = true;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/cash/index",
        success: function(res) {
          if (res.status == "success") {
            self.withdrawalList = res.data;
          } else {}
        }
      })
    }
  },
  mounted() {},
  computed: {},
  head: {}
}
</script>