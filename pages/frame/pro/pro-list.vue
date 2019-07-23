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
      <InputWrapper :label="'审核状态'">
        <el-radio-group size="middle" v-model="proStatus" @change="renderTableData">
          <el-radio-button v-for="item in proStatusOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio-button>
        </el-radio-group>
      </InputWrapper>
      <br />
      <InputWrapper :label="'商品名称'">
        <el-input v-model="name" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
      <InputWrapper :label="'商品编号'">
        <el-input v-model="id" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
      </InputWrapper>
      <InputWrapper :label="'商品类型'">
        <el-select clearable v-model="is_show" placeholder="请选择" @change="renderTableData">
          <el-option :key="1" label="上架" :value="1"></el-option>
          <el-option :key="0" label="下架" :value="0"> </el-option>
        </el-select>
      </InputWrapper>
      <div class="frame-actions">
        <el-button type="primary" @click="openProdEdit()">新建商品</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table size="small" :data="proListData" border style="width: 100%">
        <el-table-column prop="id" label="ID" :formatter="util.tableRender()" width="70px">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" :formatter="util.tableRender()" :show-overflow-tooltip="true" width="200px">
        </el-table-column>
        <el-table-column prop="" label="商品图片" :formatter="util.tableRender()" width="100px">
          <template slot-scope="scope"><img class="img-intable" :src="scope.row['image']">
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="批发价" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="price" label="零售价" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="stock" label="批发库存" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="retail_stock" label="零售库存" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="sort" label="排序" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="sales" label="真实销量" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="ficti" label="虚拟销量" :formatter="util.tableRender()">
          </el-table-column>
        <el-table-column label="审核状态" :formatter="util.tableRender()">
          <template slot-scope="scope">{{ util.keyVals.proStatus[proStatus]}} </template>
        </el-table-column>
        <el-table-column fixed="right" v-if="proStatus == 'status-2,is_del-0'" label=" 上架状态" :formatter="util.tableRender()" width="110px">
          <template slot-scope="scope"><span class="is-show-action" :class="{'is-show-active':scope.row.is_show==1}">{{scope.row.is_show==1?"上架":"下架"}}</span>
            <el-switch @change="changeIsShow2(scope.row)" style="margin-right: 10px;" v-if="proStatus == 'status-2,is_del-0'" v-model="scope.row.is_show==1">
            </el-switch>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230px">
          <template slot-scope="scope">
            <!--           <el-button @click="updateProdIsShow(scope.row,1)" v-if="proStatus == 'status-2' && scope.row.is_show == 0" size="small" type="info">上架</el-button>
            <el-button @click="updateProdIsShow(scope.row,0)" v-if="proStatus == 'status-2' && scope.row.is_show == 1" size="small" type="success">下架</el-button> -->
            <el-button @click="openProdPreview(scope.row)" size="small" type="primary">预览</el-button>
            <el-button @click="openProdEdit(scope.row)" size="small" type="success">编辑</el-button>
            <!-- <el-button size="small" type="warning">恢复</el-button> -->
            <el-button @click="deleteProd(scope.row)" v-if="proStatus != 'is_del-1'" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination ref="proListPagi" @render="renderTableData"></Pagination>
    </div>
    <GoodsEdit @prod-submit-success="goodsEditSuccess" ref="goodsEdit"></GoodsEdit>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import GoodsEdit from '~/components/frame-comp/prod/goods-edit.vue'
import Pagination from '~/components/utils-base/pagination.vue'
export default {
  props: [],
  components: { InputWrapper, GoodsEdit, Pagination },
  data() {
    return {
      test: true,
      util: util,
      proStatusOptions: util.keyVals.proStatusObjArr,
      proListData: [],
      proStatus: "status-2,is_del-0", //attr-value 
      is_show: '',
      id: '',
      name: '',
    }
  },
  methods: {
    goodsEditSuccess() {
      this.renderTableData();
    },
    // 列表
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['proListPagi'].page,
        per_page: self.$refs['proListPagi'].pageSize,
      };
      let prodStatusArr = self.proStatus.split(',');
      for (let item of prodStatusArr) {
        let key = item.split('-')[0];
        let value = item.split('-')[1];
        param[key] = value;
      }
      if (this.name) param.name = this.name;
      if (this.id) param.id = this.id;
      if (this.is_show || this.is_show === 0) param.is_show = this.is_show;
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/goods/status",
        data: JSON.stringify(param),
        success: function(res) {
          if (res.status == "success") {
            self.proListData = res.data.data;
            util.setTotal(self, 'proListPagi', res.data.total)
          }
        }
      })
    },
    // 操作
    openProdEdit(row) {
      this.$refs['goodsEdit'].show(row);
    },
    openProdPreview(row) {
      util.triggerEvent('mainComponentAction', {
        ref: "goodsPreview",
        methodsName: "show",
        params: {
          id: row.id
        }
      })
    },
    changeIsShow(row) {
      return function(is_show) {
        // 删除接口
        util.ajax({
          type: "POST",
          url: util.ajaxPath() + "/goods/isshow",
          data: JSON.stringify({
            goods_id: row.id,
            is_show: is_show ? 1 : 0,
          }),
          success: function(res) {
            if (res.status == "success") {
              util.message.success('产品' + (is_show ? '上架' : '下架') + '成功!');
              self.renderTableData();
            } else {}
          }
        })
      }
    },
    changeIsShow2(row) {
      let self = this;
      // 删除接口
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/goods/isshow",
        data: JSON.stringify({
          goods_id: row.id,
          is_show: row.is_show ? 0 : 1,
        }),
        success: function(res) {
          if (res.status == "success") {
            util.message.success('产品' + (row.is_show ? '下架' : '上架') + '成功!');
            self.renderTableData();
          } else {}
        }
      })
    },
    updateProdIsShow(row, is_show) {
      let self = this;
      self.$confirm((is_show == 0 ? '下架' : '上架') + '产品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除接口
        util.ajax({
          type: "POST",
          url: util.ajaxPath() + "/goods/isshow",
          data: JSON.stringify({
            goods_id: row.id,
            is_show: is_show,
          }),
          success: function(res) {
            if (res.status == "success") {
              util.message.success('产品' + (is_show == 0 ? '下架' : '上架') + '成功!');
              self.renderTableData();
            } else {}
          }
        })
      }).catch(() => {});
    },
    deleteProd(row) {
      let self = this;
      self.$confirm('确定删除该条产品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        util.ajax({
          type: "GET",
          url: util.ajaxPath() + "/goods/del/" + row.id,
          success: function(res) {
            if (res.status == "success") {
              util.message.success('产品删除成功!');
              self.renderTableData();
            } else {}
          }
        })
      }).catch(() => {});
    },
    recoveryProd(row) {}
  },
  mounted() {
    this.renderTableData();
  },
  computed: {},
  head: {},
  layout: 'frame'
}
</script>