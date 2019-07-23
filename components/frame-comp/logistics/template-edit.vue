<style lang="less"> // temp start
 .template-table{
  table thead {
    th{
      padding: 0;
    }
  }
  .area-span{
    padding:  15px 0;
  }
  }.area-edit-btn{
    margin-bottom: 0px ! important;
  }
  .baoyou-select{
    width: 150px;
  }
  .baoyou-input{
    width: 100px;
  }
  .baoyou-item-cont{
    display: inline-block;
    margin-left: 10px;
  }
  .el-table__empty-text{
    line-height: 49px;
  }
  .el-table__empty-block{
    min-height: 49px;
  }
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" @closed="dialogClosed" :close-on-click-modal="false" top="5vh" :title="isSpecial?'特殊地区模板设置':'运费模板设置'" :visible.sync="dialogVisible" width="1100px">
      <el-form class="form" label-width="100px" ref="form" :model="form" :rules="formRules">
        <template>
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </template>
        <el-form-item label="是否包邮">
          <el-radio-group v-model="form.is_postage">
            <el-radio :label="0">自定义运费</el-radio>
            <el-radio v-if="!isSpecial" :label="1">商家包邮</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="form.is_postage=='0'">
          <el-form-item label="计价方式">
            <el-radio-group v-model="form.type" @change="changeTableType">
              <el-radio :label="2">按重量</el-radio>
              <el-radio :label="1">按件数</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="运送方式">
            <div class="table-container template-table">
              <template v-if="form.type==2">
                <el-table ref="tab1" size="small" :data="form.subitem||[]" border tooltip-effect="light">
                  <el-table-column label="运送到" :show-overflow-tooltip="true" width="200px">
                    <template slot-scope="scope">
                      <template v-if="scope.row.default"> 默认 </template>
                      <template v-else> {{((scope.row.areas || []).join("、"))}} </template>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="!isSpecial" label="操作" width="76px">
                    <template slot-scope="scope">
                      <el-button v-if="!scope.row.default" @click="editArea(scope.row,scope.$index)" class="area-edit-btn" type="" size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="initial_key" label="首重(kg)" :formatter="util.tableRender()">
                    <template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].initial_key" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="initial_val" label="运费(元)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].initial_val" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="increase_key" label="首次续重(kg)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].increase_key" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="increase_val" label="运费(元)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].increase_val" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="later_key" label="续重(kg)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].later_key" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="later_val" label="运费(元)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].later_val" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="!isSpecial" label="操作" width="76px">
                    <template slot-scope="scope">
                      <el-button v-if="!scope.row.default" @click="deleteAreaItem(scope.$index)" class="area-edit-btn" type="" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <!-- 件数 -->
              <template v-if="form.type==1">
                <el-table ref="tab2" size="small" :data="form.subitem||[]" border tooltip-effect="light">
                  <el-table-column label="运送到" :show-overflow-tooltip="true" width="200px">
                    <template slot-scope="scope">
                      <template v-if="scope.row.default"> 默认 </template>
                      <template v-else> {{((scope.row.areas || []).join("、"))}} </template>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="!isSpecial" label="操作" width="75px">
                    <template slot-scope="scope">
                      <el-button v-if="!scope.row.default" @click="editArea(scope.row,scope.$index)" class="area-edit-btn" type="" size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="initial_key" label="首件数(件)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].initial_key" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="initial_val" label="首件运费(元)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].initial_val" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="increase_key" label="续件数(件)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].increase_key" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="increase_val" label="续件运费(元)" :formatter="util.tableRender()"><template slot-scope="scope">
                      <el-input v-model="form.subitem[scope.$index].increase_val" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="!isSpecial" label="操作" width="76px">
                    <template slot-scope="scope">
                      <el-button v-if="!scope.row.default" @click="deleteAreaItem(scope.$index)" class="area-edit-btn" type="" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <el-button v-if="!isSpecial" @click="addAreaItem" size="small" type="success">添加区域</el-button>
            </div>
          </el-form-item>
          <el-form-item label="自定义包邮">
            <div class="table-container template-table">
              <!-- 包邮 -->
              <template>
                <el-table ref="tab2" size="small" :data="form.postage||[]" border tooltip-effect="light">
                  <el-table-column label="选择地区" :show-overflow-tooltip="true" width="200px">
                    <template slot-scope="scope">
                      <template> {{((scope.row.areas || []).join("、"))}} </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="75px">
                    <template slot-scope="scope">
                      <el-button @click="editArea(scope.row,scope.$index,true)" class="area-edit-btn" type="" size="small">编辑</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="initial_key" label="设置包邮条件" :formatter="util.tableRender()">
                    <template slot-scope="scope">
                      <el-select class="baoyou-select" size="small" v-model="scope.row.type">
                        <el-option label="件数" :value="2"> </el-option>
                        <el-option label="金额" :value="1"> </el-option>
                        <!-- <el-option label="件数+金额" :value="2"> </el-option> -->
                      </el-select>
                      <template>
                        <div class="baoyou-item-cont" v-if="scope.row.type===2||scope.row.type===3">
                          <span>满</span>
                          <el-input class="baoyou-input" v-model="scope.row.value" size="small"></el-input>
                          <span>件包邮</span>
                        </div>
                      </template>
                      <template>
                        <div class="baoyou-item-cont" v-if="scope.row.type===1||scope.row.type===3">
                          <span>满</span>
                          <el-input class="baoyou-input" v-model="scope.row.value" size="small"></el-input>
                          <span>元包邮</span>
                        </div>
                      </template>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="76px">
                    <template slot-scope="scope">
                      <el-button @click="deleteBaoyouItem(scope.$index)" class="area-edit-btn" type="" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button @click="addAreaItemForBaoyou" size="small" type="success">添加区域</el-button>
              </template>
            </div>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button @click="submit" type="primary" style="width: 120px;">保存</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <TemplateAreaEdit @sure-area="sureArea" ref="templateAreaEdit"></TemplateAreaEdit>
  </div>
</template>
<script>
import util from '~/utils/common'
import TemplateAreaEdit from '~/components/frame-comp/logistics/template-area-edit'
export default {
  components: { TemplateAreaEdit },
  data() {
    // 新增模板
    this.formDefault = {
      type: 2,
      name: '',
      is_postage: 0,
      subitem: [{
        default: true,
        areas: [],
        initial_key: '',
        initial_val: '',
        increase_key: '',
        increase_val: '',
        later_key: '',
        later_val: '',
      }],
      postage: [],
    };
    // 新增特殊地区模板
    this.formDefault2 = {
      type: 2,
      name: '',
      is_postage: 0,
      initial_key: '1',
      initial_val: '1',
      increase_key: '1',
      increase_val: '1',
      later_key: '1',
      later_val: '1',
      postage: [],
      subitem: [{
        special: true,
        areas: ["新疆", "西藏"],
        initial_key: '',
        initial_val: '',
        increase_key: '',
        increase_val: '',
        later_key: '',
        later_val: '',
      }, {
        special: true,
        areas: ["香港", "澳门", "台湾"],
        initial_key: '',
        initial_val: '',
        increase_key: '',
        increase_val: '',
        later_key: '',
        later_val: '',
      }],
    };
    return {
      util: util,
      form: util.clone(this.formDefault),
      isSpecial: false,
      dialogVisible: false,
      formRules: {
        name: [util.c.rules.defaultRequired]
      },
    };
  },
  methods: {
    sureArea(checks, index, baoyou) {
      if (!baoyou) this.$set(this.form.subitem[index], "areas", checks)
      else {
        this.$set(this.form.postage[index], "areas", checks)
      }
    },
    changeTableType() {
      let self = this;
      let t = self.$refs['tab1'];
    },
    dialogClose() {
      this.$refs['form'].clearValidate();
    },
    dialogClosed() {
      this.$emit('template-edit-closed');
    },
    addAreaItem() {
      this.form.subitem.push({
        areas: [],
        initial_key: '',
        initial_val: '',
        increase_key: '',
        increase_val: '',
        later_key: '',
        later_val: '',
      })
    },
    addAreaItemForBaoyou() {
      this.form.postage.push({
        areas: [],
        type: '',
        value: '',
      })
    },
    editArea(row, index, baoyou) {
      // 不可添加区域
      let checkedList = [];
      let subitem = this.form.subitem;
      if (baoyou) {
        subitem = this.form.postage;
      }
      for (let i in subitem) {
        if (i == index) continue;
        if (subitem[i].areas && subitem[i].areas.length) {
          checkedList = checkedList.concat(subitem[i].areas)
        }
      }
      this.$refs['templateAreaEdit'].show(row, index, checkedList, baoyou)
    },
    deleteAreaItem(index) {
      this.form.subitem.splice(index, 1);
    },
    deleteBaoyouItem(index) {
      this.form.postage.splice(index, 1);
    },
    show(data, _special) {
      let self = this;
      if (data) {
        self.form = util.clone(data);
      } else {
        if (!_special) {
          self.form = util.clone(self.formDefault);
        } else {
          self.form = util.clone(self.formDefault2);
        }
      }
      self.isSpecial = _special ? true : false;
      self.dialogVisible = true;
      self.$nextTick(function() {
        if (self.$refs['tab1']) self.$refs['tab1'].doLayout();
        if (self.$refs['tab2']) self.$refs['tab2'].doLayout();
        self.$refs['form'].clearValidate();
      })
    },
    submit() {
      let self = this;
      // validate
      self.$refs['form'].validate((valid) => {
        if (valid) {
          if (self.form.is_postage == '0') {
            let subitem = self.form.subitem;
            for (let itm of subitem) {
              if (!itm.default && itm.areas.length == 0) {
                util.message.error('送货地域不能为空');
                return;
              }
              // 非特殊地区
              if (!self.isSpecial) {
                if (!util.c.regexp.priceRegExp.test(itm.initial_key) || !util.c.regexp.priceRegExp.test(itm.initial_val) || !util.c.regexp.priceRegExp.test(itm.increase_key) || !util.c.regexp.priceRegExp.test(itm.increase_val)) {
                  util.message.error('运费或重量及运费填写错误或为空');
                  return;
                }
                if (self.form.type == 2) {
                  if (!util.c.regexp.priceRegExp.test(itm.later_key) || !util.c.regexp.priceRegExp.test(itm.later_val)) {
                    util.message.error('运费或重量及运费填写错误或为空');
                    return;
                  }
                }
              }
              //特殊地区
              else {
                if ((!util.c.regexp.priceRegExp.test(itm.initial_key) || !util.c.regexp.priceRegExp.test(itm.initial_val) || !util.c.regexp.priceRegExp.test(itm.increase_key) || !util.c.regexp.priceRegExp.test(itm.increase_val)) && !(itm.initial_key == '' && itm.initial_val == '' && itm.increase_key == '' && itm.increase_val == '')) {
                  util.message.error('运费或重量及运费填写错误或为空');
                  return;
                }
                if (self.form.type == 2) {
                  if (!util.c.regexp.priceRegExp.test(itm.later_key) || !util.c.regexp.priceRegExp.test(itm.later_val)) {
                    util.message.error('运费或重量及运费填写错误或为空');
                    return;
                  }
                }
              }
            };
            let postage = self.form.postage;
            for (let itm of postage) {
              if (!itm.default && itm.areas.length == 0) {
                util.message.error('送货地域不能为空');
                return;
              }
              if (!util.c.regexp.priceRegExp.test(itm.value)) {
                util.message.error('包邮条件填写错误或为空');
                return;
              }
            };
          }
          let form = util.clone(self.form);
          // success;
          // 遍历清空按件计算属性
          if (form.type == 1)
            for (let subitem of form.subitem) {
              delete subitem.later_key;
              delete subitem.later_val;
            }
          //非特殊区域
          if (!self.isSpecial) {
            let itm = form.subitem[0];
            form.initial_key = itm.initial_key;
            form.initial_val = itm.initial_val;
            form.increase_key = itm.increase_key;
            form.increase_val = itm.increase_val;
            form.later_key = itm.later_key;
            form.later_val = itm.later_val;
            form.subitem.shift();
            //特殊区域
            // 数据处理
            if (self.form.is_postage == 1) {
              delete form.initial_key;
              delete form.initial_val;
              delete form.increase_key;
              delete form.increase_val;
              delete form.later_key;
              delete form.later_val;
            }

          } else {
            form.is_special = 1;
          }
          util.ajax({
            type: form.id === undefined ? "POST" : "PUT",
            url: util.ajaxPath() + "/freight" + (form.id === undefined ? "" : ("/" + form.id)),
            data: JSON.stringify(form),
            success: function(res) {
              if (res.status == "success") {
                util.message.success("模板编辑成功！");
                self.dialogVisible = false;
                self.$emit('edit-success')
              }
            }
          })
        }
      })
    },
  },
  mounted() {}
};
</script>