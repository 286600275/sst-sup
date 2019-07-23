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
.align-center{
  text-align:center;
}
</style>
<template>
  <div>
    <div class="frame-search">
      <div class="align-center">
        <InputWrapper style="vertical-align: top;">
          <el-radio-group size="middle" v-model="dateRangeQuick" @change="dataRangeQuickChange">
            <el-radio-button v-for="item in dateRangeOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
          </el-radio-group>
        </InputWrapper>
        <InputWrapper>
          <el-date-picker @change="dataRangeChange" v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
        </InputWrapper>
      </div>
    </div>
    <div class="finance-overview">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-card shadow="hover">
            <div class="over-label">浏览次数(次) </div>
            <div class="over-data">{{sumData.sum_browse_num || '-'}}</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="hover">
            <div class="over-label">浏览用户(个) </div>
            <div class="over-data">{{sumData.sum_browse_user || '-'}}</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="hover">
            <div class="over-label">成交订单(笔) </div>
            <div class="over-data">{{sumData.sum_order_num || '-'}}</div>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card shadow="hover">
            <div class="over-label">成交金额(元) </div>
            <div class="over-data">{{sumData.sum_order_amount || '-'}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!--     <div class="frame-search">
      <InputWrapper :label="'商品编号'">
        <el-input v-model="id" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
      <InputWrapper :label="'商品名称'">
        <el-input v-model="name" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
    </div> -->
    <div class="table-container">
      <el-table size="small" :data="dataCenterListData" border style="width: 100%">
        <!--    <el-table-column prop="id" label="排名" :formatter="util.tableRender()" width="70px">
        </el-table-column> -->
        <el-table-column prop="goods_id" label="商品编号" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column label="商品图片" :formatter="util.tableRender()">
          <template slot-scope="scope"><img class="img-intable" :src="scope.row['goods_img']">
          </template>
        </el-table-column>
        <el-table-column prop="sum_browse_user" label="浏览用户" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="sum_browse_num" label="浏览次数" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="sum_order_num" label="成交订单" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="sum_order_amount" label="成交金额" :formatter="util.tableRender()">
        </el-table-column>
      </el-table>
      <Pagination ref="dataCenterListPagi" @render="renderTableData"></Pagination>
    </div>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import Pagination from '~/components/utils-base/pagination.vue'
export default {
  props: [],
  components: { InputWrapper, Pagination },
  data() {
    return {
      test: true,
      util: util,
      dateRangeQuick: "0",
      dateRangeOptions: [{
        label: "今日",
        value: "0"
      }, {
        label: "昨日",
        value: "-1"
      }, {
        label: "最近7日",
        value: "-7"
      }, {
        label: "最近30日",
        value: "-30"
      }],
      dateRange: [],
      id: '',
      name: '',
      sumData: {},
      dataCenterListData: [],
    }
  },
  methods: {
    dataRangeQuickChange() {
      let self = this;
      if (!self.dateRangeQuick) return;
      let dis = parseInt(self.dateRangeQuick)
      let startTime = moment().add('days', dis).format('YYYY-MM-DD');
      let endTime = moment().format('YYYY-MM-DD');
      self.dateRange = [startTime, endTime];
      // alert(startTime)
      // switch (self.dateRangeQuick) {
      //   case "0":
      //     break;
      //   case "-1":
      //     break;
      //   case "-7":
      //     break;
      //   case "-30":
      //     break;
      // }
      this.renderTableData();
    },
    dataRangeChange() {
      this.dateRangeQuick = "";
      this.renderTableData();
    },
    goodsEditSuccess() {
      this.renderTableData();
    },
    // 列表
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['dataCenterListPagi'].page,
        per_page: self.$refs['dataCenterListPagi'].pageSize,
      };
      if (self.dateRange) {
        param.start_time = self.dateRange[0];
        param.end_time = self.dateRange[1];
      }
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/data/center",
        data: JSON.stringify(param),
        success: function(res) {
          if (res.status == "success") {
            self.sumData = res.sum;
            self.dataCenterListData = res.list.data;
            self.$refs['dataCenterListPagi'].setTotal(res.list.total);
          }
        }
      })
    },
  },
  mounted() {
    this.dateRange = [util.dataRender(new Date(), 'date', 'YYYY-MM-DD'), util.dataRender(new Date(), 'date', 'YYYY-MM-DD')];
    this.renderTableData();
  },
  computed: {},
  head: {},
  layout: 'frame'
}
</script>