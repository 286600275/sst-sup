<style lang="less">
  .banner-item-dialog .el_table_body{
  width: 800px;
}
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" :close-on-click-modal="false" top="5vh" title="选择商品" class="large-dialog" :visible.sync="dialogVisible">
      <div>
        <div class="frame-search">
          <InputWrapper :label="'商品名称'">
            <el-input v-model="name" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
          </InputWrapper>
          <InputWrapper :label="'商品编号'">
            <el-input v-model="id" placeholder="请输入" style="width:240px" @keydown.enter.native="renderTableData"> </el-input>
          </InputWrapper>
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
            <el-table-column prop="sales" label="真实销量" :formatter="util.tableRender()">
            </el-table-column>
            <el-table-column prop="ficti" label="虚拟销量" :formatter="util.tableRender()">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150px">
              <template slot-scope="scope">
                <el-button size="small" type="success">详情</el-button>
                <el-button @click="select(scope.row)" size="small" type="primary">选择</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination ref="proListPagi" @render="renderTableData"></Pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload2 from '~/components/utils/upload2'
import InputWrapper from '~/components/utils/input-wrapper'
import Pagination from '~/components/utils-base/pagination.vue'
export default {
  components: { Upload2, InputWrapper, Pagination },
  data() {
    return {
      util: util,
      dialogVisible: false,
      proListData: [],
      name: '',
      id: '',
      index: '',
    };
  },
  methods: {
    dialogClose() {},
    show(index) {
      this.dialogVisible = true;
      this.index = index;
      this.$nextTick(_ => {
        this.renderTableData();
      })
    },
    select(row) {
      this.$emit('chose-item', this.index, row);
      this.dialogVisible = false;
    },
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['proListPagi'].page,
        per_page: self.$refs['proListPagi'].pageSize,
        status: 2,
      };
      if (this.name) param.name = this.name;
      if (this.id) param.id = this.id;
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
  },
  mounted() {}
};
</script>