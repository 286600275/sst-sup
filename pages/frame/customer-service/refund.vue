<style lang="less"> // 
.is-show-action{
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
        <el-radio-group size="middle" v-model="refundProcessStatus" @change="renderTableData">
          <el-radio-button :key="'all'" label="all">全部</el-radio-button>
          <el-radio-button v-for="item in refundProcessStatusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
        </el-radio-group>
      </InputWrapper>
      <br />
      <InputWrapper :label="'订单编号'">
        <el-input v-model="order_sn" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
      <InputWrapper :label="'退款编号'">
        <el-input v-model="refund_sn" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
      <InputWrapper v-if="refundProcessStatus!='0'" :label="'处理时间'">
        <el-date-picker value-format="yyyy-MM-dd" align="right" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="handleDaterange" @change="renderTableData">
        </el-date-picker>
      </InputWrapper>
      <InputWrapper v-if="refundProcessStatus=='0'" :label="'退款申请时间'">
        <el-date-picker value-format="yyyy-MM-dd" align="right" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="refundDaterange" @change="renderTableData">
        </el-date-picker>
      </InputWrapper>
      <InputWrapper :label="'退款内容'">
        <el-select style="width:240px" size="middle" v-model="refundState" @change="renderTableData" clearable>
          <el-option v-for="item in refundStateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </InputWrapper>
      <InputWrapper v-if="refundProcessStatus=='0'" :label="'订单状态'">
        <el-select style="width:240px" size="middle" v-model="orderStatus" @change="renderTableData" clearable>
          <el-option v-for="item in orderStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </InputWrapper>
      <InputWrapper :label="'快递单号'">
        <el-input v-model="express_code" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
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
        <el-table-column prop="created_at" label="退款申请时间" :formatter="util.tableRender('date','YYYY-MM-DD HH:mm:ss')">
        </el-table-column>
        <el-table-column label="剩余时间">
          <template slot-scope="scope"> {{getLeftTime(scope.row.created_at)}} </template>
        </el-table-column>
        <el-table-column prop="refund_state" label="退款内容" :formatter="util.tableRender('refundState')">
        </el-table-column>
        <el-table-column v-show="refundProcessStatus!='0'" prop="first_check" label="处理时间" :formatter="util.tableRender('date','YYYY-MM-DD HH:mm:ss')">
        </el-table-column>
        <el-table-column label="退款说明" :formatter="util.tableRender()">
          <template slot-scope="scope">
            <el-button @click="showRefundDetail(scope.row)" size="small" type="primary">信息</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="refundProcessStatus!='0'" prop="expressOrder.express_name" label="快递公司" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column v-if="refundProcessStatus!='0'" prop="expressOrder.express_code" label="快递单号" :formatter="util.tableRender()">
        </el-table-column>
        <!-- 审核状态(供应商) -->
        <template v-if="refundProcessStatus!='0'">
          <el-table-column prop="refund_check" label="审核状态" :formatter="util.tableRender('refundCheckStatus')">
          </el-table-column>
        </template>
        <!-- <el-table-column prop="retail_stock" label="操作人" :formatter="util.tableRender()"> -->
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200px">
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
    <SendGoodsForm @action-success="renderTableData" ref="sendGoodsForm"></SendGoodsForm>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import Pagination from '~/components/utils-base/pagination.vue'
import RefundDetail from '~/components/frame-comp/customer-service/refund-detail.vue'
import RejectRefund from '~/components/frame-comp/customer-service/reject-refund.vue'
import SendGoodsForm from '~/components/frame-comp/order/send-goods-form'
export default {
  props: [],
  components: { InputWrapper, Pagination, RefundDetail, RejectRefund, SendGoodsForm },
  data() {
    return {
      test: true,
      util: util,
      refundProcessStatusOptions: util.keyVals.refundProcessStatusObjArr,
      refundStateOptions: util.keyVals.refundStateObjArr,
      orderStatusOptions: util.keyVals.orderStatusObjArr,
      refundListData: [],
      refundProcessStatus: this.$route.query.order_sn ? "all" : "0", //attr-value 
      daterange: [],
      renderDate: '',
      is_show: '',
      order_sn: this.$route.query.order_sn || "",
      refund_sn: '',
      express_code: '',
      refundState: '',
      orderStatus: '',
      handleDaterange: [],
      refundDaterange: [],
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
      let strategyL = [];
      let refundCheck = row.refund_check; //处理状态
      let refundStatus = row.refund_status; //退款状态
      let refundState = row.refund_state; //退款内容
      let productState = row.product_state; // 商品状态
      let is_intervention = row.is_intervention // 后台是否介入
      // 
      if (is_intervention == 0) {
        if (refundCheck == 0) { //未处理
          if (refundState == 0) { //仅退款
            strategyL.push(self.strategyActionButton("A"));
            strategyL.push(self.strategyActionButton("C"));
          } else if (refundState == 1) { //退款退货
            strategyL.push(self.strategyActionButton("B"));
            strategyL.push(self.strategyActionButton("C"));
          } else if (refundState == 2) { //换货
            strategyL.push(self.strategyActionButton("B"));
            strategyL.push(self.strategyActionButton("D"));
          }
        } else if (refundCheck == 3) { //处理中
          if (refundState == 0) { //仅退款 
          } else if (refundState == 1) { //退款退货
            strategyL.push(self.strategyActionButton("A"));
            strategyL.push(self.strategyActionButton("C"));
          } else if (refundState == 2) { //换货
            strategyL.push(self.strategyActionButton("A"));
            strategyL.push(self.strategyActionButton("E"));
            strategyL.push(self.strategyActionButton("D"));
          }
        } else if (refundCheck == 1 || refundCheck == 2) { //已处理
          if (refundCheck == 1) {} else {
            strategyL.push(self.strategyActionButton("F"));
          }
        }
      } else {
        strategyL.push(self.strategyActionButton("G"));
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
            type: 'info',
            text: '商品寄回',
          }
          break;
        case "C": //拒绝退款
          btnObj = {
            type: 'danger',
            text: '拒绝退款',
          }
          break;
        case "D": //拒绝换货
          btnObj = {
            type: 'danger',
            text: '拒绝换货',
          }
          break;
        case "E": //拒绝换货
          btnObj = {
            type: 'primary',
            text: '填写单号',
          }
          break;
        case "F": //拒绝理由
          btnObj = {
            type: 'primary',
            text: '拒绝理由',
          }
          break;
        case "G": //平台介入
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
          self.certainRefund(row, 1, 1)
          break;
        case "B":
          self.certainRefund(row, 2, 3)
          break;
        case "C":
          self.rejectRefund(row, 1)
          break;
        case "D":
          self.rejectRefund(row, 2)
          break;
        case "E":
          self.$refs['sendGoodsForm'].show(row.expressRefund, 'refund');
          break;
        case "F":
          self.$alert(row.refund_reason || "-", '拒绝理由', {
            confirmButtonText: '确定',
            closeOnPressEscape: true,
            callback: action => {}
          });
        case "G":
          let content = util.keyVals.brainState[row.brain_state];
          self.$alert(content || "-", '平台处理状态', {
            confirmButtonText: '确定',
            closeOnPressEscape: true,
            callback: action => {}
          });
      }
    },
    getLeftTime(t) {
      // 剩余时间  创建时间加3天减去目前时间
      let self = this;
      let ctime = new moment(parseInt(self.renderDate));
      t = t * 1000;
      let lastTime = new moment(t).add('days', 3);
      let leftTime = lastTime.diff(ctime);
      if (leftTime < 0) return "-";
      let D = Math.floor(leftTime / (1000 * 60 * 60 * 24));
      leftTime = leftTime % (1000 * 60 * 60 * 24);
      let H = Math.floor(leftTime / (1000 * 60 * 60));
      leftTime = leftTime % (1000 * 60 * 60);
      let m = Math.floor(leftTime / (1000 * 60));
      leftTime = leftTime % (1000 * 60);
      let s = Math.floor(leftTime / (1000));
      leftTime = leftTime % (1000);
      return D + "天" + H + "小时" + m + "分钟"
    },
    certainRefund(row, type, checkStatus) {
      let self = this;
      this.$confirm('确认同意' + (type == 1 ? '退款' : '商品寄回') + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退款同意操作
        util.ajax({
          type: "POST",
          url: util.ajaxPath() + "/refund/change",
          data: JSON.stringify({
            id: row.id,
            refund_check: checkStatus,
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
      if (self.refundProcessStatus) {
        param.refund_check = self.refundProcessStatus;
        if (self.refundProcessStatus == 'all') {
          param.refund_check = ""
        }
      }
      if (self.refundState) param.refund_state = self.refundState
      if (self.express_code) param.express_code = self.express_code;
      if (self.refundProcessStatus == '0') {
        if (self.refundDaterange && self.refundDaterange.length) {
          param.start_time_create = new Date(self.refundDaterange[0]).getTime() / 1000;
          param.end_time_create = new Date(self.refundDaterange[1]).getTime() / 1000 + 60 * 60 * 24;
        }
      } else {
        if (self.handleDaterange && self.handleDaterange.length) {
          param.start_time_check = new Date(self.handleDaterange[0]).getTime() / 1000;
          param.end_time_check = new Date(self.handleDaterange[1]).getTime() / 1000 + 60 * 60 * 24;
        }
      }
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/order/refund",
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
                if (item2.is_refund == 1 || item2.is_refund == 2) { //退款退货
                  expressOrder = item2;
                }
              })
              expressRefund.id = item.order_id;
              expressRefund.refund_id = item.id;
              expressRefund.is_store = item.is_store;
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