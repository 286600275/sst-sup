<style>
</style>
<template>
  <div>
    <div class="frame-search">
    </div>
    <div class="table-container">
      <el-table size="small" :data="proClassifyListData" border style="width: 100%">
        <el-table-column prop="name" label="分类名称" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column prop="remark" label="需求资料" :formatter="util.tableRender()">
        </el-table-column>
        <el-table-column label="审核状态" :formatter="util.tableRender()">
          <template slot-scope="scope">{{ util.keyVals.prodClassifyStatus[scope.row.is_status]}} </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button v-if="(scope.row.is_status == '0'||scope.row.is_status == '10')" @click="applyClassVerify(scope.row)" size="small" type="primary">申请审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :attrs="{pageSize:15,pageSizes:[15,30,50,100]}" ref="proClassifyListPagi" @render="renderTableData"></Pagination>
    </div>
    <el-dialog class="small-dialog" top="5vh" :title="'申请审核'" :visible.sync="dialogVisible">
      <el-form label-width="100px" ref="form" small :model="formRow" :rules="formRules">
        <el-form-item label="分类名称">
          <span class="view-form-con">{{formRow.name}}</span>
        </el-form-item>
        <el-form-item label="需求资料">
          <span class="view-form-con">{{formRow.remark}}</span>
        </el-form-item>
        <el-form-item label="图片上传" prop="images">
          <Upload2 :uploadFolder="'brand_classify_verify'" :attrs="{listType:'picture-card',hideAdd:true}" v-model="formRow.images"></Upload2>
        </el-form-item>
        <el-form-item>
          <div class="action-buttons">
            <el-button @click="submit" type="primary">提交</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
import InputWrapper from '~/components/utils/input-wrapper'
import GoodsEdit from '~/components/frame-comp/prod/goods-edit.vue'
import Pagination from '~/components/utils-base/pagination.vue'
import Upload2 from '~/components/utils/upload2.vue'
export default {
  props: [],
  components: { InputWrapper, GoodsEdit, Pagination, Upload2 },
  data() {
    return {
      util: util,
      proClassifyListData: [],
      dialogVisible: false,
      formRow: {
        images: [],
      },
      formRules: {
        images: [{ required: true, message: util.c.tip.required, trigger: 'change', type: "array" }],
      }
    }
  },
  methods: {
    // 列表
    renderTableData() {
      let self = this;
      let param = {
        page: self.$refs['proClassifyListPagi'].page,
        per_page: self.$refs['proClassifyListPagi'].pageSize,
      };
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/categoryauditing/show",
        data: JSON.stringify(param),
        success: function(res) {
          if (res.status == "success") {
            self.proClassifyListData = res.data.data; 
            util.setTotal(self, 'proClassifyListPagi', res.data.total)
          }
        }
      })
    },
    // 操作
    applyClassVerify(row) {
      this.dialogVisible = true;
      this.formRow = {
        icon: [],
        name: row.name,
        id: row.id,
        remark: row.remark,
        status: row.status
      }
    },
    // 审核
    handleRemove({ prop, fileList } = {}) {
      let formRow = util.clone(this.formRow);
      formRow['icon'] = fileList;
      this.formRow = formRow;
    },
    handleUploadSuccess({ prop, fileList } = {}) {
      let formRow = util.clone(this.formRow);
      formRow['icon'] = fileList;
      this.formRow = formRow;
    },
    submit() {
      let self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          util.ajax({
            type: "POST",
            url: util.ajaxPath() + "/categoryauditing/create",
            data: JSON.stringify({
              class_id: self.formRow.id,
              status: 1,
              images: util.filterData(self.formRow.images, (d) => util.getUrlPathKey(d.url)),
            }),
            success: function(res) {
              if (res.status == "success") {
                util.message.success('提交成功！');
                self.renderTableData();
                self.dialogVisible = false;
              }
            }
          })
        } else {
          self.$nextTick(() => {
            $('.el-dialog__wrapper').animate({
              scrollTop: ($('.el-form-item.is-error')[0].offsetTop) + 'px'
            }, 600);
          })
        }
      });
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