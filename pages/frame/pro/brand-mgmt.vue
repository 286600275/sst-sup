<style>
</style>
<template>
  <div>
    <div class="frame-search">
      <div class="frame-actions">
        <el-button type="primary" @click="openBrandEdit()">添加品牌</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table size="small" :data="brandListData" border style="width: 100%">
        <el-table-column prop="id" label="ID" :formatter="util.tableRender()" width="70px">
        </el-table-column>
        <el-table-column prop="brand.name" label="申请品牌名称" :formatter="util.tableRender()" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="name" label="品牌名称" :formatter="util.tableRender()" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="en_name" label="品牌英文名称" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column label="品牌LOGO" :formatter="util.tableRender()">
          <template slot-scope="scope"><img class="img-intable" :src="scope.row['logo_img']">
          </template>
        </el-table-column>
        <el-table-column label="状态" :formatter="util.tableRender()">
          <template slot-scope="scope">{{ util.keyVals.brandStatus[scope.row.status]}} </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-button @click="showBz(scope.row)" v-if="scope.row.status == '11'" size="small" type="text">查看原因</el-button>
            <!-- <el-button @click="openBrandEdit(scope.row)" size="small" type="primary">重新提交</el-button> -->
            <el-button @click="openBrandEdit(scope.row)" v-if="scope.row.status == '11'" size="small" type="primary">重新提交</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :attrs="{pageSize:15,pageSizes:[15,30,50]}" ref="brandListPag" @render="renderTableData"></Pagination>
    </div>
    <BrandEdit @brand-submit-success="brandSubmitSuccess" ref="brandEdit"></BrandEdit>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import BrandEdit from '~/components/frame-comp/prod/brand-edit.vue'
import Pagination from '~/components/utils-base/pagination.vue'
export default {
  props: [],
  components: { InputWrapper, BrandEdit, Pagination },
  data() {
    return {
      util: util,
      brandListData: [],
    }
  },
  methods: {
    brandSubmitSuccess() {
      this.renderTableData();
    },
    // 列表
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['brandListPag'].page,
        per_page: self.$refs['brandListPag'].pageSize,
      };
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/brand",
        data: param,
        success: function(res) {
          if (res.status == "success") {
            self.brandListData = res.data.data;
            util.setTotal(self, 'brandListPag', res.data.total)
          }
        }
      })
    },
    // 操作
    openBrandEdit(row) {
      this.$refs['brandEdit'].show(row);
    },
    showBz(row) {
      this.$alert(row.bz, '审核失败原因', {
        confirmButtonText: '确定',
        closeOnPressEscape: true,
        callback: action => {}
      });
    }
  },
  mounted() {
    this.renderTableData();
  },
  computed: {},
  head: {},
  layout: 'frame'
}
</script>