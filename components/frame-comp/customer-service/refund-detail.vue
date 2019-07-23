<style lang="less">
.order-price {
  text-align: right;
  line-height: 24px;

  .order-price-total {
    label {
      line-height: 30px;
      font-size: 16px;
      color: red;
    }
  }

  .order-price-text {
    display: inline-block;
    width: 80px;
    text-align: center;
  }
}

.refund-img-ul li {
  float: left;
  margin: 0 20px 20px 0;

  .refund-img {
    cursor: pointer;
    display: inline-block;
    width: 155px;
    border-radius: 5px;
    height: 160px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" :close-on-click-modal="false" top="5vh" title="退款信息" class="middle-dialog" :visible.sync="dialogVisible">
      <el-form class="form form-show" label-position="left" label-width="120px" ref="form" :model="refundRow">
        <div class="form-group-title2">商品内容</div>
        <div class="table-container">
          <el-table size="small" :data="refundRow.refund_goods ?[refundRow.refund_goods]:[]" border style="width: 100%">
            <el-table-column prop="id" label="ID" :formatter="util.tableRender()" width="70px">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" :formatter="util.tableRender()" :show-overflow-tooltip="true" width="200px">
            </el-table-column>
            <el-table-column prop="" label="商品图片" :formatter="util.tableRender()" width="100px">
              <template slot-scope="scope"><img class="img-intable" :src="scope.row['goods_image']">
              </template>
            </el-table-column>
            <el-table-column prop="goods_price" label="单价" :formatter="util.tableRender()">
            </el-table-column>
            <el-table-column prop="goods_num" label="数量" :formatter="util.tableRender()">
            </el-table-column>
            <el-table-column prop="goods_pay_price" label="总价" :formatter="util.tableRender()">
            </el-table-column>
          </el-table>
        </div>
        <div class="order-price">
          <div> <label>商品总价</label><span class="order-price-text">{{util.dataRender(refundRow.shipping_fee)}}元</span></div>
          <div> <label>运费</label><span class="order-price-text">{{util.dataRender(refundRow.shipping_fee)}}元</span></div>
          <div class=""> <label>订单总价</label><span class="order-price-text">{{util.dataRender(refundRow.order_amount)}}元</span></div>
          <div class="order-price-total"> <label>退款总额</label><span class="order-price-text">{{util.dataRender(refundRow.refund_amount)}}元</span></div>
        </div>
        <div class="form-group-title2">退款状态</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客服审核状态">
              <span>{{util.dataRender(refundRow.refund_check,"refundCheckStatus")}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="财务审核状态">
              <span>{{util.dataRender(refundRow.finance_check,"financeCheckStatus")}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="退款到账状态">
              <span>{{util.dataRender(refundRow.refund_status,"refundStatus")}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="form-group-title2">退款/退货说明</div>
        <div class="form-content2">{{refundRow.comment}}</div>
        <div class="form-group-title2">退款图片</div>
        <ul class="refund-img-ul form-content2">
          <template v-for="item in refundRow.refund_img || []">
            <li><span @click="showPreiview(item)" class="refund-img" :style="util.getBackgroundUrlStyle(item)"></span></li>
          </template>
          <span class="clear-f"></span>
        </ul>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload2 from '~/components/utils/upload2'
export default {
  components: { Upload2 },
  data() {
    return {
      util: util,
      dialogVisible: false,
      refundRow: {}
    };
  },
  methods: {
    dialogClose() {},
    showPreiview(url) {
      let self = this;
      util.triggerEvent('mainComponentAction', {
        ref: "imagePreview",
        methodsName: "show",
        params: url
      })
    },
    show(row) {
      let self = this;
      self.refundRow = row
      self.dialogVisible = true;
    },
  },
  mounted() {}
};
</script>