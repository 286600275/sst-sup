<style lang="less"> .is-show-action{
  color: #999;
 &.is-show-active{
  color: #188eee;
}
}
 
</style>
<template>
  <div>
    <div class="frame-search">
      <InputWrapper :label="'处理状态'">
        <el-radio-group size="middle" v-model="financeCheckProcessStatus" @change="renderTableData">
          <el-radio-button v-for="item in financeCheckProgressStatusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
        </el-radio-group>
      </InputWrapper>
      <br />
      <InputWrapper :label="'订单编号'">
        <el-input v-model="order_sn" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
      <InputWrapper :label="'退款编号'">
        <el-input v-model="refund_sn" placeholder="" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
    </div>
    <div class="table-container">
      <el-table size="small" :data="refundListData" border style="width: 100%">
        <el-table-column prop="id" label="ID" :formatter="util.tableRender()" width="100px">
        </el-table-column>
        <el-table-column prop="refund_sn" label="退款编号" :formatter="util.tableRender()" :show-overflow-tooltip="true" width="150px">
        </el-table-column>
        <el-table-column prop="order_sn" label="订单编号" :formatter="util.tableRender()" :show-overflow-tooltip="true" width="150px">
        </el-table-column>
        <el-table-column prop="refund_amount" label="退款金额" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="refund_state" label="退款内容" :formatter="util.tableRender('refundState')">
        </el-table-column>
        <el-table-column label="退款说明" :formatter="util.tableRender()">
          <template slot-scope="scope">
            <el-button @click="showRefundDetail(scope.row)" size="small" type="primary">信息</el-button>
          </template>
        </el-table-column>
        <!-- 审核状态 -->
        <template>
          <el-table-column prop="finance_check" label="审核状态" :formatter="util.tableRender('financeCheckStatus')">
          </el-table-column>
        </template>
        <!-- 退款日期 -->
        <template>
          <el-table-column prop="finished_at" label="退款日期" :formatter="util.tableRender('date','YYYY-MM-DD HH:mm:ss')" width="200px">
          </el-table-column>
        </template>
        <!-- <el-table-column prop="retail_stock" label="操作人" :formatter="util.tableRender()"> -->
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="195px">
          <template slot-scope="scope">
            <template v-for="item in operatorStrategyList(scope.row)">
              <el-button size="small" @click="strategyAction(scope.row,item.strategy)" :type="item.type">{{item.text}}</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <Pagination ref="refundPagi" @render="renderTableData"></Pagination>
    </div>
    <RefundDetail ref="refundDetail"></RefundDetail>
    <RejectRefund @operator-success="renderTableData" ref="rejectRefund"></RejectRefund>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import Pagination from '~/components/utils-base/pagination.vue'
import RefundDetail from '~/components/frame-comp/customer-service/refund-detail.vue'
import RejectRefund from '~/components/frame-comp/finance/reject-refund.vue'
export default {
  props: [],
  components: { InputWrapper, Pagination, RefundDetail, RejectRefund },
  data() {
    return {
      test: true,
      util: util,
      financeCheckProgressStatusOptions: util.keyVals.financeCheckProgressStatusObjArr,
      refundListData: [],
      financeCheckProcessStatus: "0",
      daterange: [],
      renderDate: '',
      is_show: '',
      id: '',
      order_sn: this.$route.query.order_sn || "",
      refund_sn: '',
    }
  },
  methods: {
    /*
      A 待处理/处理中—同意退款
      B 处理中_商品寄回
      C 待处理/处理中_拒绝退款
      D 处理中_拒绝换货
      E 处理中_填写单号
    */
    operatorStrategyList: function(row) {
      let self = this;
      let financeCheck = row.finance_check
      let strategyL = [];
      let is_intervention = row.is_intervention // 后台是否介入
      if (is_intervention == 0) {
        if (self.financeCheckProcessStatus == "0") {
          strategyL.push(self.strategyActionButton("A"));
          strategyL.push(self.strategyActionButton("B"));
        } else {
          if (financeCheck == 2) {
            strategyL.push(self.strategyActionButton("C"));
          }
        }
      } else {
        strategyL.push(self.strategyActionButton("D"));
      }
      return strategyL
    },
    strategyActionButton(strategy) {
      let btnObj = null;
      switch (strategy) {
        case "A": //同意退款
          btnObj = {
            type: 'primary',
            text: '同意退款',
          }
          break;
        case "B": //商品寄回
          btnObj = {
            type: 'danger',
            text: '拒绝退款',
          }
          break;
        case "C": //拒绝理由
          btnObj = {
            type: 'primary',
            text: '拒绝理由',
          }
          break;
        case "D": //平台介入
          btnObj = {
            type: 'text',
            text: '平台介入',
          }
          break;
      }
      btnObj.strategy = strategy;
      return btnObj;
    },
    strategyAction(row, strategy) {
      let self = this;
      switch (strategy) {
        case "A":
          self.certainRefund(row)
          break;
        case "B":
          self.rejectRefund(row)
          break;
        case "C":
          self.$alert(row.refund_reason || "-", '拒绝理由', {
            confirmButtonText: '确定',
            closeOnPressEscape: true,
            callback: action => {}
          });
          break;
        case "D":
          let content = util.keyVals.brainState[row.brain_state];
          self.$alert(content || "-", '平台处理状态', {
            confirmButtonText: '确定',
            closeOnPressEscape: true,
            callback: action => {}
          });
          break;
      }
    },
    // getLeftTime(t) {
    //   let self = this;
    //   let ctime = new moment(parseInt(self.renderDate));
    //   t = t * 1000;
    //   let lastTime = new moment(t).add('days', 3);
    //   let leftTime = lastTime.diff(ctime);
    //   if (leftTime < 0) return "-";
    //   let D = Math.floor(leftTime / (1000 * 60 * 60 * 24));
    //   leftTime = leftTime % (1000 * 60 * 60 * 24);
    //   let H = Math.floor(leftTime / (1000 * 60 * 60));
    //   leftTime = leftTime % (1000 * 60 * 60);
    //   let m = Math.floor(leftTime / (1000 * 60));
    //   leftTime = leftTime % (1000 * 60);
    //   let s = Math.floor(leftTime / (1000));
    //   leftTime = leftTime % (1000);
    //   return D + "天" + H + "小时" + m + "分钟"
    // },
    certainRefund(row) {
      let self = this;
      this.$confirm('确认同意退款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退款同意操作
        util.ajax({
          type: "POST",
          url: util.ajaxPath() + "/refund/check",
          data: JSON.stringify({
            id: row.id,
            finance_check: 1
          }),
          success: function(res) {
            if (res.status == "success") {
              util.message.success('操作成功');
              self.renderTableData();
            }
          }
        })
      }).catch(() => {});
    },
    rejectRefund(row, type) {
      this.$refs['rejectRefund'].show(row, type);
    },
    goodsEditSuccess() {
      this.renderTableData();
    },
    // 列表
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['refundPagi'].page,
        per_page: self.$refs['refundPagi'].pageSize,
      };
      if (self.order_sn) param.order_sn = self.order_sn;
      if (self.refund_sn) param.refund_sn = self.refund_sn;
      if (self.financeCheckProcessStatus) {
        param.finance_check = self.financeCheckProcessStatus;
      }
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/finance/refund",
        data: JSON.stringify(param),
        success: function(res) {
          if (res.status == "success") {
            self.renderDate = new Date().getTime() + '';
            let refundListData = res.data.data;
            refundListData.forEach(function(item) {
              let expressRefund = {},
                expressOrder;
              let expressList = item.refund_express || [];
              expressList.forEach(function(item2) {
                if (item2.is_store == 3) {
                  expressRefund = item2;
                } else {
                  expressOrder = item2;
                }
              })
              expressRefund.id = item.order_id;
              expressRefund.refund_id = item.id;
              item.expressRefund = expressRefund;
              item.expressOrder = expressOrder || {};
            })
            self.refundListData = refundListData;
            util.setTotal(self, 'refundPagi', res.data.total)
          }
        }
      })
    },
    // 操作
    showRefundDetail(row) {
      this.$refs['refundDetail'].show(row);
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