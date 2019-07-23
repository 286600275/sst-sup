<style lang="less"> // 
.finance-overview{
    text-align: center;
     .el-row {
      margin-bottom: 20px;
     }
  .over-label{
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    color: #666;

  }
  .over-data{
    height: 40px;
    line-height: 40px; 
    font-size: 16px;
  }
}
.finance-operation{
  margin-bottom: 20px;
  margin-left: 20px;
  .el-button{
    width: 150px;
  }
}
</style>
<template>
  <div>
    <div class="finance-overview">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="over-label">今日收入(元) </div>
            <div class="over-data">{{util.dataRender(data['today_income'],'fixed',2)}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="over-label">总收入(元) </div>
            <div class="over-data">{{util.dataRender(data['sum_income'],'fixed',2)}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="over-label">已提现(元) </div>
            <div class="over-data">{{util.dataRender(data['already_withdraw'],'fixed',2)}}</div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class="over-label">可提现金额(元) </div>
            <div class="over-data">{{util.dataRender(data['sum_withdraw'],'fixed',2)}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="finance-operation">
      <el-button type="primary" @click="actionWithDrawal">提现</el-button>
      <el-button type="success" @click="showMyBankCardList">我的银行卡</el-button>
      <el-button type="info" @click="showWithdrawalList">提现记录</el-button>
    </div>
    <div class="frame-search">
      <InputWrapper :label="'日期'">
        <el-date-picker v-model="daterange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="renderTableData" value-format="yyyy-MM-dd">
        </el-date-picker>
      </InputWrapper>
    </div>
    <div class="table-container">
      <el-table size="small" :data="detailListData" border style="width: 100%">
        <el-table-column prop="date" label="日期" :formatter="util.tableRender()" width="100px">
        </el-table-column>
        <el-table-column prop="income" label="当日收入" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="wholesale" label="批发订单" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="retail" label="零售订单" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="withdraw" label="到账提现金额" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="tax" label="税费" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="service" label="服务费用" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="discount" label="优惠券总额" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="refund" label="退款金额" :formatter="util.tableRender()">
        </el-table-column>
      </el-table>
      <Pagination ref="detailListPagi" @render="renderTableData"></Pagination>
    </div>
    <BankCardList ref="bankCardList"></BankCardList>
    <WithdrawalList ref="withdrawalList"></WithdrawalList>
    <Withdrawal ref="withdrawal"></Withdrawal>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import Pagination from '~/components/utils-base/pagination.vue'
// 我的银行卡
import BankCardList from '~/components/frame-comp/finance/bank-card-list'
// 提现记录
import WithdrawalList from '~/components/frame-comp/finance/withdrawal-list'
// 提现
import Withdrawal from '~/components/frame-comp/finance/withdrawal'
export default {
  props: [],
  components: { InputWrapper, Pagination, BankCardList, WithdrawalList, Withdrawal },
  data() {
    return {
      test: true,
      util: util,
      daterange: [],
      detailListData: [],
      data: {},
    }
  },
  methods: {
    actionWithDrawal() {
      this.$refs['withdrawal'].show();
    },
    showWithdrawalList() {
      this.$refs['withdrawalList'].show();
    },
    showMyBankCardList() {
      this.$refs['bankCardList'].show();
    },
    goodsEditSuccess() {
      this.renderTableData();
    },
    // 列表
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['detailListPagi'].page,
        per_page: self.$refs['detailListPagi'].pageSize,
        start_time: (self.daterange || [])[0] || "",
        end_time: (self.daterange || [])[1] || "",
      };
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/finance/index",
        data: JSON.stringify(param),
        success: function(res) {
          if (res.status == "success") {
            self.data = res.data;
            self.detailListData = res.data.list.data || [];
            util.setTotal(self, 'detailListPagi', res.data.list.total)
          }
        }
      })
    },
  },
  mounted() {
    this.renderTableData();
  },
  computed: {},
  head: {},
  layout: 'frame'
}
</script>