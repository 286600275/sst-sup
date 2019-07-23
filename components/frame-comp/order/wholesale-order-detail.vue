<style lang="less">
.order-price {
  text-align: right;
  line-height: 24px;
  .order-price-total {
    line-height: 30px;
    font-size: 16px;
    color: red;
  }
  .order-price-text {
    display: inline-block;
    width: 100px;
    text-align: center;
  }
}
</style>
<template>
  <div>
    <el-dialog width="960px" @close="dialogClose" :close-on-click-modal="false" top="5vh" :title="(type=='retail'?'零售':'批发')+'-订单信息'" class="middle-dialog" :visible.sync="dialogVisible">
      <el-form class="form form-show" label-position="left" label-width="120px" ref="form">
        <div class="form-group-title">商品信息</div>
        <div class="table-container">
          <el-table size="small" :data="(orderData.order_goods || [])" border style="width: 100%">
            <!-- <el-table-column prop="id" label="ID" :formatter="util.tableRender()" width="70px">
            </el-table-column> -->
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
            <el-table-column prop="goods_num" label="数量" :formatter="util.tableRender()">
            </el-table-column>
            <el-table-column prop="goods_pay_price" label="成交单价" :formatter="util.tableRender()">
            </el-table-column>
            <el-table-column prop="goods_pay_price_amount_row" label="成交总价" :formatter="util.tableRender('fixed')">
            </el-table-column>
          </el-table>
        </div>
        <div class="order-price">
          <div> <label>批发总价</label><span class="order-price-text">{{util.dataRender(orderData.goods_price_amount,'fixed')}}元</span></div>
          <div> <label>运费</label><span class="order-price-text">{{orderData.shipping_fee}}元</span></div>
          <div> <label>服务费</label><span class="order-price-text">{{util.dataRender(orderData.middle_fee,'fixed')}}元</span></div>
          <div class="order-price-total"> <label>最终可得</label><span class="order-price-text">{{util.dataRender(orderData.supplier_income,'fixed')}}元</span></div>
        </div>
        <div class="form-group-title">订单信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单编号">
              <span>{{orderData.order_sn}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交时间">
              <span>{{util.dataRender(orderData.payment_at,'date')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认时间">
              <span>{{util.dataRender(orderData.payment_at,'date')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户人">
              <span>{{orderData.shop_user_name ||'-'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户电话">
              <span>{{orderData.shop_user_mobile}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商户ID">
              <span>{{orderData.shop_user_id}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="收货地址">
              <span>{{orderData.address}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-group-title">物流信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="快递">
              <span>{{util.getDepData(orderData,'express_info.express_name') || "-"}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="快递单号">
              <span>{{util.getDepData(orderData,'express_info.express_code') || "-"}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="logistics-con">
          <template v-if="(orderData.express||[]).length">
            <el-timeline>
              <el-timeline-item v-for="(expressData, index) in orderData.express||[]" :key="index" :timestamp="expressData.time"> {{expressData.context}} </el-timeline-item>
            </el-timeline>
          </template>
          <template v-else-if="orderData.express && orderData.express.result===false">
            <span>{{orderData.express.message||"暂无信息"}}</span>
          </template>
          <template v-else>
            <span>暂无物流详细信息</span>
          </template>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  components: {},
  data() {
    return {
      util: util,
      dialogVisible: false,
      type: "retail",
      orderData: {},
    };
  },
  methods: {
    dialogClose() {
      this.orderData = {};
    },
    init() {},
    show(data, type) {
      let self = this;
      self.type = type;
      self.dialogVisible = true;
      getOrderData(type).then((res) => {
        res = util.other.countAmount(res);
        self.orderData = Object.assign({
          middle_fee: util.dataRender(data.middle_fee, 'fixed'),
          goods_pay_price_amount: data.goods_pay_price_amount,
          goods_price_amount: data.goods_price_amount,
        }, res);
      })

      function getOrderData(type) {
        return new Promise((resolve, reject) => {
          util.ajax({
            type: "GET",
            url: util.ajaxPath() + "/order/" + (type == 'retail' ? "" : "shop/") + "show/" + data.id,
            success: function(res) {
              if (res.status == "success") {
                resolve(res);
              } else {}
            },
            error() {
              util.message.error('订单详情获取失败！');
              return true;
            }
          })
        })
      }
    },
    submit() {}
  },
  mounted() {},
  computed: {
    finallyPrice() {
      if (this.orderData.goods_price_amount) {
        return util.dataRender(parseFloat(this.orderData.goods_price_amount) + parseFloat(this.orderData.shipping_fee) - parseFloat(this.orderData.middle_fee), 'fixed')
      }
    }
  },
};
</script>