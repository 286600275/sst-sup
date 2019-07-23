<style lang="less"> /**/
.freight-t-operation{
  margin-bottom: 10px;
  margin-left: 0px;
  .el-button{
    width: 150px;
  }
}
</style>
<template>
  <div>
    <div class="freight-t-operation">
      <el-button @click="editTemplate()" type="primary">新增运费模板</el-button>
      <!-- <el-button @click="editTemplate(null,true)" type="info">新增特殊地区模板</el-button> -->
    </div>
    <!-- 一般运费模板 -->
    <template v-for="(item,index) in normalTemplateList">
      <TemplateRow @select-supplier="selectSupplierDefault(index)" @select-user="selectUserDefault(index)" @delete="deleteTemplate(index)" @edit="editTemplate(index)" :templateData="item" :originData="originData[index]"></TemplateRow>
    </template>
    <!-- ****************特殊地区隐藏 *****************-->
    <!-- <div class="frame-title">特殊地区运费模板</div> -->
    <!-- 特殊运费模板 -->
    <!--     <template v-for="(item,index) in specialTemplateList">
      <TemplateRow @select-supplier="selectSupplierDefault(index,true)" @select-user="selectUserDefault(index,true)" @delete="deleteTemplate(index,true)" @edit="editTemplate(index,true)" :templateData="item" :originData="item">
      </TemplateRow>
    </template> -->
    <TemplateEdit v-if="templateEditLife" @template-edit-closed="templateEditClosed" @edit-success="templateEditSuccess" ref="templateEdit"></TemplateEdit>
  </div>
</template>
<script>
import util from '~/utils/common'
import TemplateRow from '~/components/frame-comp/logistics/template-row'
import TemplateEdit from '~/components/frame-comp/logistics/template-edit'
export default {
  props: [],
  components: { TemplateRow, TemplateEdit },
  data() {
    return {
      util: util,
      originData: [],
      normalTemplateList: [],
      specialTemplateList: [],
      templateEditLife: true,
    }
  },
  methods: {
    templateEditClosed() {
      // 重置生命周期 解决表格排版错乱BUG
      let self = this;
      self.templateEditLife = false;
      self.$nextTick(_ => {
        self.templateEditLife = true;
      })
    },
    deleteTemplate(index, special) {
      let self = this;
      let selectTemplate = special ? self.specialTemplateList : self.normalTemplateList;
      this.$confirm('确定删除模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        util.ajax({
          type: "DELETE",
          url: util.ajaxPath() + "/freight/" + selectTemplate[index].id,
          success: function(res) {
            if (res.status == "success") {
              util.message.success('模板删除成功');
              self.renderTemplateData();
            }
          }
        })
      })
    },
    templateEditSuccess() {
      this.renderTemplateData();
    },
    editTemplate(index, special) {
      let self = this;
      if (index === undefined) {
        this.$refs['templateEdit'].show()
      } else {
        let selectTemplate = special ? self.specialTemplateList : self.normalTemplateList;
        this.$refs['templateEdit'].show(selectTemplate[index], special);
      }
    },
    selectUserDefault(index, special) {
      let self = this;
      let form = util.clone((special ? self.specialTemplateList[index] : self.originData[index]));
      form.is_select_user = 1;
      util.ajax({
        type: "PUT",
        url: util.ajaxPath() + "/freight/" + form.id,
        data: JSON.stringify(form),
        success: function(res) {
          if (res.status == "success") {
            util.message.success("默认模板设置成功");
            self.renderTemplateData();
          }
        }
      })
    },
    selectSupplierDefault(index, special) {
      let self = this;
      let form = util.clone((special ? self.specialTemplateList[index] : self.originData[index]));
      form.is_select_supplier = 1;
      util.ajax({
        type: "PUT",
        url: util.ajaxPath() + "/freight/" + form.id,
        data: JSON.stringify(form),
        success: function(res) {
          if (res.status == "success") {
            util.message.success("默认模板设置成功");
            self.renderTemplateData();
          }
        }
      })
    },
    dataChange(d) {
      let self = this;
      let d1 = []; //原始数据
      let d2 = []; //一般模板
      let d3 = []; //特殊地区
      for (let item of d) {
        if (!item.is_special) { //一般运费模板
          let defItem = {
            initial_key: item.initial_key,
            initial_val: item.initial_val,
            increase_key: item.increase_key,
            increase_val: item.increase_val,
            later_key: item.later_key,
            later_val: item.later_val,
            default: true,
          };
          d1.push(util.clone(item));
          item.subitem.unshift(defItem);
          d2.push(util.clone(item));
        } else { //特殊运费模板
          d3.push(util.clone(item));
        }
      }
      self.originData = d1;
      self.normalTemplateList = d2;
      self.specialTemplateList = d3;
    },
    // 列表
    renderTemplateData() {
      let self = this;
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/freight",
        success: function(res) {
          if (res.status == "success") {
            self.dataChange(res.data)
          }
        }
      })
    },
  },
  mounted() {
    this.renderTemplateData();
  },
  computed: {},
  head: {},
  layout: 'frame'
}
</script>