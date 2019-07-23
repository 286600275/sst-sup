<style>
</style>
<template>
  <div>
    <div class="frame-search">
      <InputWrapper :label="'订单编号'">
        <el-input placeholder="请输入" v-model="order_sn" style="width:220px" @keydown.enter.native="renderTableData"></el-input>
      </InputWrapper>
      <InputWrapper :label="'商品编号'">
        <el-input placeholder="请输入" v-model="goods_id" style="width:220px" @keydown.enter.native="renderTableData"></el-input>
      </InputWrapper>
      <!--       <InputWrapper :label="'发票状态'">
        <el-select v-model="p1" style="width:220px"></el-select>
      </InputWrapper> -->
      <!--       <InputWrapper :label="'入库时间'">
        <el-date-picker v-model="p2" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange">
        </el-date-picker>
      </InputWrapper> -->
      <InputWrapper :label="'商品名称'">
        <el-input placeholder="请输入" v-model="goods_name" style="width:220px" @keydown.enter.native="renderTableData"></el-input>
      </InputWrapper>
      <InputWrapper :label="'订单状态'">
        <el-select clearable v-model="state" style="width:220px" @change="renderTableData">
          <el-option v-for="item in orderStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </InputWrapper>
      <InputWrapper :label="'下单时间'">
        <el-date-picker value-format="yyyy-MM-dd" align="right" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="orderCreateTimeRange" @change="renderTableData">
        </el-date-picker>
      </InputWrapper>
      <!--       <InputWrapper :label="'订单状态'">
        <el-select v-model="p1" style="width:220px"></el-select>
      </InputWrapper> -->
      <!--       <InputWrapper :label="'发票状态'">
        <el-select v-model="p1" style="width:220px"></el-select>
      </InputWrapper> -->
      <div class="frame-actions">
        <el-button type="primary" @click="downloadExcel()">导出Excel</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table size="small" :data="orderListData" style="width: 100%" tooltip-effect="light">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-container">
              <el-table size="small" :data="(scope.row.order_goods || [])" border style="width: 100%">
                <el-table-column prop="id" label="ID" :formatter="util.tableRender()" width="60px">
                </el-table-column>
                <el-table-column prop="goods_name" label="商品名称" :formatter="util.tableRender()" :show-overflow-tooltip="true" width="200px">
                </el-table-column>
                <el-table-column label="商品图片" :formatter="util.tableRender()" width="100px">
                  <template slot-scope="scope"><img class="img-intable" :src="scope.row['goods_image']">
                  </template>
                </el-table-column>
                <el-table-column prop="goods_sku_name" label="商品规格" :formatter="util.tableRender()">
                </el-table-column>
                <el-table-column prop="goods_price" label="批发价" :formatter="util.tableRender()">
                </el-table-column>
                <el-table-column prop="middle_fee" label="服务费" :formatter="util.tableRender('fixed')">
                </el-table-column>
                <el-table-column prop="goods_num" label="数量" :formatter="util.tableRender()">
                </el-table-column>
                <el-table-column prop="goods_pay_price_amount_row" label="成交总格" :formatter="util.tableRender('fixed')">
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" :formatter="util.tableRender()" width="40px">
        </el-table-column>
        <el-table-column prop="order_sn" label="订单编号" :formatter="util.tableRender()" :show-overflow-tooltip="true" width="120px">
        </el-table-column>
        <el-table-column prop="created_at" label="下单时间" :formatter="util.tableRender('date','YYYY-MM-DD HH:mm:ss')" width="100px">
        </el-table-column>
        <el-table-column prop="payment_at" label="交易时间" :formatter="util.tableRender('date','YYYY-MM-DD HH:mm:ss')" width="100px">
        </el-table-column>
        <el-table-column prop="goods_pay_price_amount" label="成交总价" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="goods_price_amount" label="批发总价" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="middle_fee" label="服务费" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="shipping_fee" label="运费" :formatter="util.tableRender()">
        </el-table-column>
        <!--         <el-table-column label="发票">
          <template slot-scope="scope">
            <el-button @click="actionShowInvoice(scope.row)" type="text" size="small">{{ scope.row.is_invoice==0?"待开":"已开" }}</el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="订单状态" :formatter="util.tableRender()">
          <template slot-scope="scope"> {{util.keyVals.orderStatus[scope.row.state]|| "-"}} </template>
        </el-table-column>
        <el-table-column label="商品数量" :formatter="util.tableRender()">
          <template slot-scope="scope"> {{scope.row.order_goods.length ||0}} </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="240px">
          <template slot-scope="scope">
            <!-- 
               "0": "已取消",
               "10": "未付款",
               "20": "待发货", 
               "30": "已发货",
               "40": "已完成",
            -->
            <el-button @click="actionShowOrderDetail(scope.row)" size="small" type="primary">订单信息</el-button>
            <el-button v-if="scope.row.state!='0' &&scope.row.state!='20'&&scope.row.state!='30'" @click="actionCancleOrder(scope.row)" size="small" type="danger">取消订单</el-button>
            <!-- <el-button @click="actionRefund(scope.row)" size="small" type="warning">退款售后</el-button> -->
            <el-button v-if="scope.row.state=='20'" @click="actionSendGoods(scope.row)" size="small" type="success">发货</el-button>
            <el-button v-if="scope.row.state=='30'" @click="actionSendGoods(scope.row)" size="small" type="success">修改发货单</el-button>
            <el-button v-if="scope.row.state=='50'||scope.row.state=='60'" @click="refundJump(scope.row)" size="small" type="success">退款售后</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination ref="wholesaleOrderPagi" @render="renderTableData"></Pagination>
    </div>
    <WholesaleOrderDetail ref="wholesaleOrderDetail"></WholesaleOrderDetail>
    <InvoiceImages ref="invoiceImages"></InvoiceImages>
    <SendGoodsForm @action-success="renderTableData" ref="sendGoodsForm"></SendGoodsForm>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import Pagination from '~/components/utils-base/pagination.vue'
import WholesaleOrderDetail from '~/components/frame-comp/order/wholesale-order-detail'
import InvoiceImages from '~/components/frame-comp/order/invoice-images'
import SendGoodsForm from '~/components/frame-comp/order/send-goods-form'
export default {
  props: [],
  components: { InputWrapper, Pagination, WholesaleOrderDetail, InvoiceImages, SendGoodsForm },
  data() {
    return {
      util: util,
      orderStatusOptions: util.keyVals.orderStatusObjArr,
      goods_name: "",
      order_sn: "",
      name: "",
      state: "",
      goods_id: "",
      orderCreateTimeRange: [],
      orderListData: [],
    }
  },
  methods: {
    refundJump(row) {
      let order_sn = row.order_sn;
      util.triggerEvent('sideBarOpen', '/frame/customer-service', '/frame/customer-service/refund');
      this.$router.push('/frame/customer-service/refund?order_sn=' + order_sn);
    },
    actionShowInvoice(row) {
      this.$refs['invoiceImages'].show(row, "wholesale");
    },
    actionShowOrderDetail(row) {
      this.$refs['wholesaleOrderDetail'].show(row, "wholesale");
    },
    actionRefund(row) {},
    actionCancleOrder(row) {
      let self = this;
      this.$confirm('确定取消订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        util.ajax({
          type: "GET",
          url: util.ajaxPath() + "/order/shop/cancel/" + row.id,
          success: function(res) {
            if (res.status == "success") {
              util.message.success('订单取消成功');
              self.renderTableData();
            }
          }
        })
      })
    },
    actionSendGoods(row) {
      this.$refs['sendGoodsForm'].show(row, 'wholesale');
    },
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['wholesaleOrderPagi'].page,
        per_page: self.$refs['wholesaleOrderPagi'].pageSize,
      };
      if (self.goods_name) param.goods_name = self.goods_name
      if (self.order_sn) param.order_sn = self.order_sn
      if (self.name) param.name = self.name
      if (self.state) param.state = self.state
      if (self.goods_id) param.goods_id = self.goods_id;
      if (self.orderCreateTimeRange && self.orderCreateTimeRange.length) {
        param.start_time = new Date(self.orderCreateTimeRange[0]).getTime() / 1000;
        param.end_time = new Date(self.orderCreateTimeRange[1]).getTime() / 1000 + 60 * 60 * 24;
      }
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/order/shop",
        data: JSON.stringify(param),
        success: function(res) {
          if (res.status == "success") {
            let orderListData = res.data;
            orderListData.forEach(function(item) {
              item = util.other.countAmount(item);
            })
            self.orderListData = orderListData;
            util.setTotal(self, 'wholesaleOrderPagi', res.total)
          }
        }
      })
    },
    downloadExcel() {
      var self = this;
      var titleArr = [
        //
        "ID", "订单编号", "下单时间", "交易时间", "成交总价", "批发总价", "订单总价", "服务费", "商品数量", "订单状态", "商户人", "商户电话", "商户ID", "收货地址"
      ];
      var dataArr = [];
      for (var i = 0, item = null; item = self.orderListData[i++];) {
        var rowData = [];
        rowData.push(util.dataRender(item.id)); //ID
        rowData.push(util.dataRender(item.order_sn)); //订单编号
        rowData.push(util.dataRender(item.created_at, 'date', 'YYYY-MM-DD HH:mm:ss')); //下单时间
        rowData.push(util.dataRender(item.payment_at, 'date', 'YYYY-MM-DD HH:mm:ss')); //交易时间 
        rowData.push(util.dataRender(item.goods_pay_price_amount)); //成交总价
        rowData.push(util.dataRender(item.goods_price_amount)); //批发总价
        rowData.push(util.dataRender(item.order_amount)); //订单总价
        rowData.push(util.dataRender(item.middle_fee, 'fixed')); //服务费
        rowData.push(util.dataRender(item.order_goods.length || 0)); //商品数量
        rowData.push(util.dataRender(util.keyVals.orderStatus[item.state] || "-")); //订单状态
        rowData.push(util.dataRender(item.name)); //商户人
        rowData.push(util.dataRender(item.shop_user_mobile)); //商户电话
        rowData.push(util.dataRender(item.shop_user_id)); //商户ID
        rowData.push(util.dataRender(item.address)); //收货地址
        dataArr.push(rowData);
      }
      util.downloadExl(titleArr, dataArr, undefined, null, "兽兽淘-批发订单列表导出.xlsx")
    },
  },
  mounted() {
    // return;
    this.renderTableData();
  },
  computed: {},
  head: {},
  layout: 'frame'
}
</script>