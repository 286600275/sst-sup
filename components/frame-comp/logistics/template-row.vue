<style lang="less"> .default-checkbox{
  line-height: 30px;
  margin-right: 10px;
} 
.template-row{
  margin-bottom: 10px;
  &.template-row1{
    width: 75%;
  }
  .el-tag{
    padding: 0 14px;
  }
  .template-top{
    .el-button+.el-tag,
    .el-tag+.el-tag{
      margin-left: 5px;
    }
  }
}
.template-top{
  height: 60px;
  line-height: 30px;
  padding: 10px;
  border:1px solid #EBEEF5;
  background: #fff;
  border-bottom: 0px;
  .template-name{
    font-size: 15px;
    font-weight: bold;
    color: #666;
  }
  .template-last-time{

  }
}
.template-last-actions {
  display: inline-block;
  .el-button{
    margin-left: 5px;
  }
}
.temp-row-is_postage{
  text-align: center;
  width: 100%;
  background:#fff;
  padding:10px;
  padding-bottom:20px;
  border-top: 1px solid #EBEEF5;
}
</style>
<template>
  <div class="template-row" :class="'template-row'+(templateData.is_postage?1:templateData.type)">
    <!-- 重量 -->
    <div class="template-top">
      <el-row>
        <el-col :span="8">
          <span class="template-name">{{templateData.name}}</span>
        </el-col>
        <el-col :span="8">
          <span class="template-last-time">{{templateData.updated_at}}</span>
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <div class="template-last-actions">
            <!-- 默认模板 -->
            <template>
              <el-button @click="$emit('select-supplier')" size="small" v-if="!isSelectSupplier">商家</el-button>
              <el-tag :disable-transitions="true" v-if="isSelectSupplier">商家</el-tag>
              <el-button @click="$emit('select-user')" size="small" v-if="!isSelectUser">用户</el-button>
              <el-tag :disable-transitions="true" v-if="isSelectUser">用户</el-tag>
            </template>
            <!-- <el-button @click="$emit('copy')" size="small">复制模板</el-button> -->
            <!-- <el-checkbox class="default-checkbox" :disabled="defaultIsSelect" @change="$emit('select')" v-model="isSelect">默认模板</el-checkbox> -->
            <el-button @click="$emit('edit')" size="small" type="primary">修改</el-button>
            <el-button @click="$emit('delete')" size="small" type="danger">删除</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <template v-if="templateData.is_postage==1">
      <div class="temp-row-is_postage"> 商家包邮 </div>
    </template>
    <template v-else>
      <template v-if="templateData.type==2">
        <el-table size="small" tooltip-effect="light" :data="templateData.subitem||[]" border>
          <el-table-column label="运送方式" :formatter="util.tableRender()"> 快递 </el-table-column>
          <el-table-column label="运送到" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <template v-if="scope.row.default"> 默认 </template>
              <template v-else> {{((scope.row.areas || []).join("、"))}} </template>
            </template>
          </el-table-column>
          <el-table-column prop="initial_key" label="首重(kg)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="initial_val" label="运费(元)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="increase_key" label="首次续重(元)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="increase_val" label="运费(元)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="later_key" label="续重(kg)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="later_val" label="运费(元)" :formatter="util.tableRender()">
          </el-table-column>
        </el-table>
      </template>
      <!-- 件数 -->
      <template v-if="templateData.type==1">
        <el-table size="small" tooltip-effect="light" :data="templateData.subitem||[]" border>
          <el-table-column label="运送方式" :formatter="util.tableRender()"> 快递 </el-table-column>
          <el-table-column label="运送到" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <template v-if="scope.row.default"> 默认 </template>
              <template v-else> {{((scope.row.areas || []).join("、"))}} </template>
            </template>
          </el-table-column>
          <el-table-column prop="initial_key" label="首件数(件)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="initial_val" label="首件运费(元)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="increase_key" label="续件数(件)" :formatter="util.tableRender()">
          </el-table-column>
          <el-table-column prop="increase_val" label="续件运费(元)" :formatter="util.tableRender()">
          </el-table-column>
        </el-table>
      </template>
    </template>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: ['templateData'],
  components: {},
  data() {
    return {
      util: util,
      isSelectSupplier: this.templateData.is_select_supplier == 0 ? false : true,
      isSelectUser: this.templateData.is_select_user == 0 ? false : true,
    }
  },
  methods: {
    editTemplate(templateData) {},
  },
  watch: {
    templateData: function(newQuestion, oldQuestion) {
      this.isSelectSupplier = this.templateData.is_select_supplier == 0 ? false : true;
      this.isSelectUser = this.templateData.is_select_user == 0 ? false : true;
    }
  },
  // watch: {
  //   isSelect: function(new, old) {
  //     debugger
  //   }
  // },
  mounted() {},
  computed: {
    // defaultIsSelect() { return this.isSelect ? true : false }
  },
  head: {},
  layout: 'frame'
}
</script>