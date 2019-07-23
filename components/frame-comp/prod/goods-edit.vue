<style lang="less"> // temp start
 
.custom-item1{
  height: 40px;
}
  .sku-info-con {
    padding-left: 100px;
  }

  .sku-info-table {
    border-collapse: collapse;
    margin: 10px 0;

    td {
      border: 1px solid #ebeef5;
      padding: 5px 10px;
    }

    thead {
      font-weight: bold;
      color: #777;
    }
  }

  .sku-generate-table {
    border-collapse: collapse;
    margin: 10px 0;

    td {
      border: 1px solid #ebeef5;
      padding: 5px 10px;
    }

    thead {
      font-weight: bold;
      color: #777;
    }
  }
  .sub-input{
    width:77px;
  }
  .input-new-skuitm{
    display: inline-block;
    min-width: 100px;
    width: 100px;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .sku-item-tag{
    margin-left: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
    &:nth-of-type(1){
      margin-left: 0px;
    }
  }
  .form-gift-good2{
    display: inline-block;
  }
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" :close-on-click-modal="false" top="5vh" :title="type=='add'?'新建 商品':'编辑商品'" class="large-dialog" :visible.sync="dialogVisible">
      <el-form class="form" label-width="113px" ref="form" :model="form" :rules="formRules">
        <div class="form-group-title">基本信息</div>
        <!-- 商品分类 -->
        <el-form-item label="商品分类" prop="category_id">
          <el-cascader filterable :disabled="cascaderDisabled" v-bind="{
            options: cateGorys,
            changeOnSelect: true,
            clearable: true,
            props: {
              value: 'id',
              children: 'children',
              label: 'name',
            }}" v-model="form.category_id" style='width:388px' @change="categoryChange"></el-cascader>
        </el-form-item>
        <!-- 商品品牌 -->
        <el-form-item label="商品品牌" prop="brand_id">
          <el-select v-model="form.brand_id">
            <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 动态specs 相关 -->
        <template v-for="(item,index) in specsShowList">
          <el-form-item :label="item.attr_name">
            <el-select v-model="form.specs[index]" clearable>
              <el-option v-for="item2 in item.attr_mx" :key="item2.id" :label="item2.att_value" :value="(item2.id+'')"> </el-option>
            </el-select>
          </el-form-item>
        </template>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"> </el-input>
        </el-form-item>
        <!-- 商品简介 -->
        <el-form-item label="商品简介" prop="introduction">
          <el-input v-model="form.introduction"> </el-input>
        </el-form-item>
        <!-- 商品关键字 -->
        <el-form-item label="商品关键字" prop="keyword">
          <el-input v-model="form.keyword"> </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <!-- 批发运费模板 -->
            <el-form-item label="批发运费模板" prop="freight_wholesale">
              <el-select filterable v-model="form.freight_wholesale" placeholder="门店运费模板">
                <el-option v-for="item in freightOptionsDefault" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--     <el-col :span="12">
            <el-form-item label-width="200px" label="批发特殊地区运费模板" prop="freight_wholesale_special">
              <el-select filterable v-model="form.freight_wholesale_special">
                <el-option v-for="item in freightOptionsSpecail" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <!-- 运费模板 -->
            <el-form-item label="零售运费模板" prop="freight_retail">
              <el-select filterable v-model="form.freight_retail" placeholder="用户运费模板">
                <el-option v-for="item in freightOptionsDefault" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">
            <el-form-item label-width="200px" label="零售特殊地区运费模板" prop="freight_retail_special">
              <el-select filterable v-model="form.freight_retail_special">
                <el-option v-for="item in freightOptionsSpecail" :key="item.id" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <!-- 商品单位 -->
            <el-form-item label="商品单位" prop="unit">
              <el-select filterable v-model="form.unit">
                <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 商品净重 -->
            <el-form-item class="custom-item1" label="商品净重" prop="weight">
              <el-input v-model="form.weight">
                <template slot="append">kg</template></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 商品售价 -->
            <el-form-item label="零售价" prop="price">
              <el-input v-model="form.price" @change="priceChange"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 商品批发价 -->
            <el-form-item label="批发价" prop="cost">
              <el-input v-model="form.cost"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 商品批发价 -->
            <el-form-item label="市场价" prop="ot_price">
              <el-input v-model="form.ot_price"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 赠送积分 -->
            <!--       <el-form-item  label="赠送积分" prop="give_integral">
              <el-input v-model="form.give_integral"> </el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <!-- 邮费 -->
            <!--      <el-form-item  label="邮费" prop="postage">
              <el-input v-model="form.postage"> </el-input>
            </el-form-item> -->
          </el-col>
          <el-col :span="8">
            <!-- 虚拟销量 -->
            <el-form-item label="虚拟销量" prop="ficti">
              <el-input v-model="form.ficti"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 真实销量 -->
            <el-form-item label="真实销量" prop="sales">
              <el-input v-model="form.sales"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 零售库存 -->
            <el-form-item label="零售库存" prop="retail_stock">
              <el-input v-model="form.retail_stock"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 批发库存 -->
            <el-form-item label="批发库存" prop="stock">
              <el-input v-model="form.stock"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 排序 -->
            <el-popover ref="popover-sortinput" width="300" placement="right" trigger="hover"><template>您填的数字越大，该商品在您的商品列表里面，就展示在越前面</template> </el-popover>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort">
                <i v-popover:popover-sortinput slot="suffix" class="el-input__icon el-icon-info"></i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 赠品功能 -->
            <el-form-item label="赠品功能" prop="gift_good1">
              <span>满</span>
              <el-input class="sub-input" v-model="form.gift_good1"> </el-input>
              <span>赠</span>
              <el-popover ref="popover-sub-input-tip" width="300" placement="right" trigger="hover"><template>满赠功能只对门店批发商品有效</template> </el-popover>
              <el-form-item prop="gift_good2" class="form-gift-good2">
                <el-input class="sub-input" v-model="form.gift_good2">
                  <i v-popover:popover-sub-input-tip slot="suffix" class="el-input__icon el-icon-info"></i>
                </el-input>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <!-- 商品状态 -->
            <el-form-item label="商品状态" prop="is_show">
              <el-radio-group v-model="form.is_show">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="0">下架</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 热卖单品 -->
            <el-form-item label="热卖单品" prop="is_hot">
              <el-radio-group v-model="form.is_hot">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 促销产品 -->
            <el-form-item label="促销产品" prop="is_benefit">
              <el-radio-group v-model="form.is_benefit">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 精品推荐 -->
            <el-form-item label="精品推荐" prop="is_best">
              <el-radio-group v-model="form.is_best">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 首发新品 -->
            <el-form-item label="首发新品" prop="is_new">
              <el-radio-group v-model="form.is_new">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <!-- 是否包邮 -->
            <!--      <el-form-item label="是否包邮" prop="is_postage">
              <el-radio-group v-model="form.is_postage">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item> -->
          </el-col>
        </el-row>
        <div class="form-group-title">商品属性信息</div>
        <!-- SKU********************************** START -->
        <div class="sku-info-con">
          <el-button type="primary" @click="addSkuItem">新增商品规格属性</el-button>
          <table class="sku-info-table" style="width: 100%">
            <thead>
              <tr>
                <td style="width: 200px;">规格选项</td>
                <td>规格属性</td>
                <td style="width: 70px;">操作</td>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item,index) in skuItemList">
                <tr>
                  <td>
                    <el-select v-model="skuItemList[index]['categoryId']" @change="skuItemSelect(index)">
                      <el-option v-for="item in skuSelectList" :key="item.id" :label="item.attr_name" :value="item.id"> </el-option>
                    </el-select>
                  </td>
                  <td>
                    <!--  -->
                    <el-tag class="sku-item-tag" :key="tag" v-for="tag in skuItemList[index].checks" closable :disable-transitions="false" @close="handleSkuItemListClose(tag,index)"> {{tag}} </el-tag>
                    <el-input class="input-new-skuitm" v-if="skuItemListInputVisible[index]" v-model="skuItemListInputValue[index]" :ref="'saveTagInput'+index" size="small" @keyup.enter.native="handleInputConfirm(index)" @blur="handleInputConfirm(index)">
                    </el-input>
                    <el-button v-else class="button-new-skuitm" size="small" @click="showSkuItemListInput(index)">+ 新规格属性</el-button>
                  </td>
                  <td>
                    <el-button @click="deleteSkuItem(index)" type="text">删除</el-button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <el-button type="primary" @click="generateSkuList">生成SKU列表</el-button>
          <table class="sku-generate-table">
            <thead>
              <tr>
                <td style="width: 110px;">商品规格</td>
                <td style="width: 150px;">零售价</td>
                <td style="width: 150px;">批发价</td>
                <td style="width: 150px;">零售库存</td>
                <td style="width: 150px;">批发库存</td>
                <td style="width: 150px;">商品净重(kg)</td>
                <td style="width: 170px;">SKU图片</td>
                <td style="width: 70px;">操作</td>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item,index) in skuGeneratedList">
                <tr>
                  <!-- 商品规格 -->
                  <td> {{item.attr_name}}</td>
                  <!-- 销售价 -->
                  <td>
                    <el-input v-model="skuGeneratedList[index].price"></el-input>
                  </td>
                  <!-- 批发价 -->
                  <td>
                    <el-input v-model="skuGeneratedList[index].cost_price"></el-input>
                  </td>
                  <!-- 销售库存 -->
                  <td>
                    <el-input v-model="skuGeneratedList[index].stock"></el-input>
                  </td>
                  <!-- 批发库存-->
                  <td>
                    <el-input v-model="skuGeneratedList[index].retail_stock"></el-input>
                  </td>
                  <!-- 商品净重-->
                  <td>
                    <el-input v-model="skuGeneratedList[index].weight"></el-input>
                  </td>
                  <!-- SKU图片 -->
                  <td>
                    <Upload2 :attrs="{limit:1,listType:'picture-card',isSku:true,hideAdd:true}" v-model="skuGeneratedList[index].image"></Upload2>
                  </td>
                  <!-- 操作 -->
                  <td>
                    <el-button @click="deleteSkuGItem(index)" type="text">删除</el-button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <!-- SKU********************************** END -->
        <div class="form-group-title">上传商品图片</div>
        <!-- 商品主图片 -->
        <el-form-item label="商品主图片" prop="image">
          <Upload2 :attrs="{limit:1,listType:'picture-card',hideAdd:true}" v-model="form.image"></Upload2>
        </el-form-item>
        <!-- 商品轮播图 -->
        <el-form-item label="商品轮播图" prop="goods_img">
          <Upload2 :attrs="{listType:'picture-card', multiple:true}" v-model="form.goods_img"></Upload2>
        </el-form-item>
        <div class="form-group-title">商品描述</div>
        <!-- 商品轮播图 -->
        <el-form-item label="商品详情图" prop="detail">
          <Upload2 :attrs="{listType:'picture-card',multiple:true}" v-model="form.detail"></Upload2>
        </el-form-item>
        <el-form-item style="margin-top: 20px;">
          <el-button @click="submit" type="primary" style="width: 120px;">提交</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload2 from '~/components/utils/upload2'
import QuillEditor from '~/components/utils-base/quill-editor.vue'
export default {
  components: { Upload2, QuillEditor },
  data() {
    let self = this;
    this.formDefault = {
      category_id: [], //商品分类
      brand_id: "", //商品品牌
      name: "", //商品名称
      introduction: "", //商品简介
      keyword: "", //商品关键字
      unit: "", //商品单位
      price: "", //商品售价
      ot_price: "", //市场价
      cost: "", //批发价
      give_integral: "", //赠送积分
      postage: "", //邮费
      sales: "", //销量
      ficti: "", //虚拟销量
      stock: "", //批发库存
      retail_stock: "", //零售库存
      sort: "", //排序
      freight_retail: '',
      freight_retail_special: '',
      freight_wholesale: '',
      freight_wholesale_special: '',
      gift_good1: "",
      gift_good2: "",
      is_show: 1,
      is_hot: 1,
      is_benefit: 1,
      is_best: 1,
      is_new: 1,
      is_postage: 1,
      image: [],
      goods_img: [],
      detail: [],
      specs: [],
      id: '',
    };
    return {
      dialogVisible: false,
      cascaderDisabled: false,
      type: "add",
      cateGorys: [], //商品分类 级联选择Options
      classIdsOptions: [], //品牌分类selectOptions
      freightOptions: [],
      freightOptionsDefault: [],
      freightOptionsSpecail: [],
      unitOptions: util.filterData(util.c.unitList, {
        value: (d) => d.name,
        label: (d) => d.name
      }),
      brandOptions: [], //品牌选择selectOptions
      specsShowList: [], //分类动态下拉
      //sku
      skuSelectList: [], //sku下拉选项
      skuItemList: [{ checks: [] }], //sku项目列表
      skuItemListL: 0,
      skuItemListWatch: null,
      skuItemListBack: [{ checks: [] }], //sku项目列表备份（重复选择的恢复操作）
      skuItemChecksMap: {}, //存放所有规格键值对
      skuItemAllCheckBoxList: [], //sku每一个选项的 可选checkbox 数据
      skuGeneratedList: [], //生成的sku列表
      // tag start
      skuItemListInputVisible: [],
      skuItemListInputValue: [],
      form: util.clone(this.formDefault),
      formRules: {
        category_id: [{ required: true, message: util.c.tip.required, trigger: 'change', type: "array" }, {
          trigger: 'blur',
          validator: function(rule, value, callback, source, options) {
            var errors = [];
            if (!value) callback(errors);
            if (value.length == 1) {
              errors.push('商品分类需要继续选择');
            }
            callback(errors);
          }
        }],
        brand_id: [util.c.rules.defaultRequired],
        freight_wholesale: [Object.assign({}, util.c.rules.defaultRequired)],
        freight_wholesale_special: [Object.assign({}, util.c.rules.defaultRequired)],
        freight_retail: [Object.assign({}, util.c.rules.defaultRequired)],
        freight_retail_special: [Object.assign({}, util.c.rules.defaultRequired)],
        name: [util.c.rules.defaultRequired],
        introduction: [util.c.rules.defaultRequired],
        keyword: [util.c.rules.defaultRequired],
        unit: [util.c.rules.defaultRequired],
        weight: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.priceRegExp,
          message: util.c.tip.priceErrorFormat,
          trigger: "blur"
        }],
        price: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.priceRegExp,
          message: util.c.tip.priceErrorFormat,
          trigger: "blur"
        }],
        ot_price: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.priceRegExp,
          message: util.c.tip.priceErrorFormat,
          trigger: "blur"
        }],
        give_integral: [util.c.rules.defaultRequired],
        postage: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.priceRegExp,
          message: util.c.tip.priceErrorFormat,
          trigger: "blur"
        }],
        sales: [{
          pattern: util.c.regexp.numberRegExp,
          message: util.c.tip.numberErrorFormat,
          trigger: "blur"
        }],
        ficti: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.numberRegExp,
          message: util.c.tip.numberErrorFormat,
          trigger: "blur"
        }],
        stock: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.numberRegExp,
          message: util.c.tip.numberErrorFormat,
          trigger: "blur"
        }],
        cost: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.priceRegExp,
          message: util.c.tip.priceErrorFormat,
          trigger: "blur"
        }, {
          trigger: 'blur',
          validator: function(rule, value, callback, source, options) {
            var errors = [];
            if (parseFloat(value) >= parseFloat(self.form.price)) {
              errors.push('商品批发价须低于零售价');
            }
            callback(errors);
          }
        }],
        retail_stock: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.numberRegExp,
          message: util.c.tip.numberErrorFormat,
          trigger: "blur"
        }],
        sort: [util.c.rules.defaultRequired, {
          pattern: util.c.regexp.numberRegExp,
          message: util.c.tip.numberErrorFormat,
          trigger: "blur"
        }],
        gift_good1: [{
          trigger: 'blur',
          validator: function(rule, value, callback, source, options) {
            var errors = [];
            if (value === "" && self.form.gift_good2 !== "") {
              errors.push('只填一项');
            }
            callback(errors);
          }
        }, {
          pattern: util.c.regexp.numberRegExp,
          message: util.c.tip.numberErrorFormat,
          trigger: "blur"
        }],
        gift_good2: [{
          trigger: 'blur',
          validator: function(rule, value, callback, source, options) {
            var errors = [];
            if (value === "" && self.form.gift_good1 !== "") {
              errors.push('只填一项');
            }
            callback(errors);
          }
        }, {
          pattern: util.c.regexp.numberRegExp,
          message: util.c.tip.numberErrorFormat,
          trigger: "blur"
        }],
        image: [{ required: true, message: "请至少上传一张图片", trigger: 'change', type: "array" }]
      },
    };
  },
  methods: {
    /**
     * 监听零售价变动 自动生成市场价
     */
    priceChange() {
      let price = this.form.price;
      let ot_price = (Math.ceil(parseFloat(price) * 1.1)).toFixed(2);
      this.$set(this.form, 'ot_price', ot_price);
    },
    handleSkuItemListClose(tag, index) {
      this.skuItemList[index].checks.splice(this.skuItemList[index].checks.indexOf(tag), 1);
    },
    handleInputConfirm(index) {
      let self = this;
      let inputValue = this.skuItemListInputValue[index];
      if (inputValue) {
        let skuItemList = this.skuItemList;
        if (this.skuItemList[index].checks.indexOf(inputValue) != -1) {
          util.message.error('重复的规格');
        } else this.skuItemList[index].checks.push(inputValue);
      }
      self.$set(this.skuItemListInputVisible, index, false)
      self.$set(this.skuItemListInputValue, index, '')
    },
    showSkuItemListInput(index) {
      let self = this;
      if (!self.skuItemList[index].categoryId) {
        self.$message.warning('未选择商品规格！');
        return;
      }
      self.$set(this.skuItemListInputVisible, index, true)
      this.$nextTick(_ => {
        self.$refs['saveTagInput' + index][0].$refs.input.focus();
      });
    },
    dataChange(d) {
      let self = this;
      let d1 = []; //一般模板
      let d2 = []; //特殊地区模板
      for (let item of d) {
        if (!item.is_special) { //一般模板
          d1.push(util.clone(item));
          if (item.is_select_supplier) {
            self.freight_wholesale = item.id;
          }
          if (item.is_select_user) {
            self.freight_retail = item.id;
          }
        } else {
          if (item.is_select_supplier) {
            self.freight_wholesale_special = item.id;
          }
          if (item.is_select_user) {
            self.freight_retail_special = item.id;
          }
          d2.push(util.clone(item));
        }
      }
      self.freightOptions = d1;
      self.freightOptionsDefault = d1;
      self.freightOptionsSpecail = d2;
    },
    dialogClose() {
      if (this.skuItemListWatch) this.skuItemListWatch();
      this.form = util.clone(this.formDefault);
      this.specsShowList = [];
      this.skuItemList = [{ checks: [] }];
      this.skuItemListBack = [{ checks: [] }];
      this.skuItemAllCheckBoxList = [];
      this.skuGeneratedList = [];
      this.$nextTick(function() {
        this.$refs['form'].clearValidate();
      })
      $('.el-dialog__wrapper').scrollTop(0);
    },
    init() {
      let self = this;
      // 初始化品牌选择下拉
      util.ajax({
        type: "POST",
        url: util.ajaxPath() + "/brand/all",
        success: function(res) {
          if (res.status == "success") {
            self.brandOptions = util.filterData(res.data.data, {
              value: (d) => d.id,
              label: (d) => d.name
            })
          } else {}
        }
      })
      // 初始化运费模板下拉
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/freight",
        success: function(res) {
          if (res.status == "success") {
            self.dataChange(res.data);
          }
        }
      })
      // 初始化分类下拉
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/goods/category",
        success: function(res) {
          if (res.status == "success") {
            let cateGorys = util.other.filterLeafChildren(res.data);
            console.log(cateGorys)
            self.cateGorys = cateGorys;
            let categoryMap = {};
            for (let item of cateGorys) {
              categoryMap[item.id] = item.name;
            }
          } else {}
        }
      })
    },
    show(data) {
      let self = this;
      self.type = data ? "edit" : "add";
      if (data) {
        let self = this;
        self.cascaderDisabled = true;
        util.ajax({
          type: "GET",
          url: util.ajaxPath() + "/goods/show/" + data.id,
          success: function(res) {
            if (res.status == "success") {
              let form = util.clone(res.data);
              // 设置默认商品分类
              // console.log("form.category_id", form.category_id);
              // console.log("cateGorys", self.cateGorys);
              let category_id_arrs = util.tree.findPath(form.category_id, { value: "id", data: self.cateGorys });
              // console.log("category_id_arrs", category_id_arrs)
              form.category_id = category_id_arrs;
              self.categoryChange(category_id_arrs);
              //
              form.image = [{ url: form.image }];
              form.goods_img = util.filterData(form.goods_img, { url: (d) => d.img_url })
              form.specs = form.specs ? form.specs.split(',') : [];
              //sku
              if (form.goods_sku && form.goods_sku.length) {
                if (form.goods_sku.length == 1 && form.goods_sku[0].attr_name == "") {} else {
                  self.setDefaultSkuList(form.goods_sku, form.attr_ids);
                }
              }
              //detail
              if (form.detail) {
                form.detail = util.filterData(form.detail, (d) => { return { url: d } });
              } else {
                form.detail = []
              }
              // gift_good
              if (form.gift_good) {
                let gifts = form.gift_good.split('+');
                form.gift_good1 = gifts[0];
                form.gift_good2 = gifts[1];
              }
              // 模板
              form.freight_retail_special = form.freight_retail_special || self.freight_retail_special;
              form.freight_retail = form.freight_retail || self.freight_retail;
              form.freight_wholesale_special = form.freight_wholesale_special || self.freight_wholesale_special;
              form.freight_wholesale = form.freight_wholesale || self.freight_wholesale;
              self.form = form;
              self.dialogVisible = true;
              self.cascaderDisabled = false;
            }
          }
        });
      } else {
        self.cascaderDisabled = false;
        self.dialogVisible = true;
        self.skuItemListL = 0;
      }
      // 设置默认模板id
      let form = self.form;
      form.freight_wholesale_special = form.freight_wholesale_special || self.freight_wholesale_special;
      form.freight_wholesale = form.freight_wholesale || self.freight_wholesale;
      form.freight_retail_special = form.freight_retail_special || self.freight_retail_special;
      form.freight_retail = form.freight_retail || self.freight_retail;
      self.form = form;
    },
    setDefaultSkuList(skulist, attr_ids) {
      try {
        attr_ids = (attr_ids && skulist.length) ? JSON.parse(attr_ids) : [];
      } catch (e) { attr_ids = [] }
      if (!(attr_ids instanceof Array)) attr_ids = [];
      if (!attr_ids.length) skulist = [];
      let sku_values_all_list = [];
      for (let item of skulist) {
        // 查询所有规格为渲染sku列表准备
        let item_attr_values = item.attr_values.split(',');
        for (let item2 of item_attr_values) {
          if (sku_values_all_list.indexOf(item2) == -1) sku_values_all_list.push(item2)
        }
        //图片处理
        item.image = item.image ? [{ url: item.image_url }] : [];
      }
      let self = this;
      let skuItemListT = [];
      let skuItemAllCheckBoxListT = [];
      for (let categoryItem of attr_ids) {
        skuItemListT.push({
          categoryId: categoryItem.categoryId,
          checks: categoryItem.checks
        })
      }
      self.skuItemList = skuItemListT;
      self.skuItemAllCheckBoxList = []
      self.skuGeneratedList = skulist;
      self.skuItemListL = skuItemListT.length;
      self.$nextTick(_ => {
        self.skuItemListWatch = self.$watch('skuItemList', function(newV) {
          let i = self.skuItemListL
          if (newV.length != self.skuItemListL) {
            self.skuGeneratedList = [];
            self.skuItemListL = newV.length;
          } else {
            // 过滤
            let skuCheckList = (function(list) {
              let l = [];
              for (let item of list) {
                if (item.checks.length) l.push(item.checks);
              }
              return l;
            })(newV)
            if (!skuCheckList.length) {
              self.skuGeneratedList = [];
              return;
            }
            let results = self.getExchangeResult(skuCheckList);
            self.skuGeneratedList = self.skuGeneratedList.filter(function(item) {
              return results.indexOf(item.attr_name) != -1;
            })
          }
        }, { deep: true });
      })
    },
    submit() {
      let self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          let form = util.clone(this.form);
          // category_id
          form.category_id = form.category_id[form.category_id.length - 1];
          // specs
          form.specs = form.specs.toString();
          // image
          form.image = util.getUrlPathKey(util.img.urlObj2String(form.image[0]));
          // goods_img 
          if (form.goods_img && form.goods_img.length) {
            form.goods_img = JSON.stringify(util.filterData(form.goods_img, {
              img: (d) => util.getUrlPathKey(d.url),
              id: (d) => d.id || "",
            }));
          } else {
            form.goods_img = '';
          }
          //detail
          form.detail = util.filterData(form.detail, (d) => util.getUrlPathKey(d.url)).toString();
          let skuGeneratedList = util.clone(this.skuGeneratedList);
          if (skuGeneratedList && skuGeneratedList.length) {
            for (let item of skuGeneratedList) {
              if (item.retail_stock === '' || item.stock === '' || item.price === '' || item.cost_price === '' || item.weight === '') {
                util.message.error('库存、价格、商品净重不能为空！');
                $('.el-dialog__wrapper').animate({
                  scrollTop: '900px'
                }, 600);
                return;
              }
              if (!util.c.regexp.numberRegExp.test(item.retail_stock) || !util.c.regexp.numberRegExp.test(item.stock) || !util.c.regexp.priceRegExp.test(item.price) || !util.c.regexp.priceRegExp.test(item.cost_price) || !util.c.regexp.priceRegExp.test(item.weight)) {
                util.message.error('库存、价格或商品净重格式错误！');
                $('.el-dialog__wrapper').animate({
                  scrollTop: '900px'
                }, 600);
                return;
              }
              if (parseFloat(item.cost_price) >= parseFloat(item.price)) {
                util.message.error('批发价须低于零售价');
                return;
              }
              item.image = item.image.length ? util.getUrlPathKey(item.image[0].url) : "";
            }
            form.skus = JSON.stringify(skuGeneratedList);
          } else {
            form.skus = "";
          };
          let skuItemList = util.clone(this.skuItemList);
          let attr_ids = [];
          for (let item of skuItemList) {
            if (item.categoryId && item.checks && item.checks.length) attr_ids.push({ categoryId: item.categoryId, checks: item.checks });
          }
          // attr_ids
          form.attr_ids = JSON.stringify(attr_ids);
          // gift_good
          if (form.gift_good1) { form.gift_good = form.gift_good1 + "+" + form.gift_good2; } else {
            form.gift_good = "";
          }
          console.log(form);
          // return;
          util.ajax({
            type: "POST",
            url: util.ajaxPath() + "/goods/create",
            data: JSON.stringify(form),
            success: function(res) {
              if (res.code == 200) {
                self.$emit('prod-submit-success');
                self.dialogVisible = false;
                self.$nextTick(function() {
                  util.message.success(res.message);
                })
              } else {}
            }
          })
        } else {
          self.$nextTick(() => {
            let firstErorrDom = $('.el-form-item.is-error')[0];
            if ($(firstErorrDom).parents('.el-row')[0]) {
              $('.el-dialog__wrapper').animate({
                scrollTop: ($(firstErorrDom).parents('.el-row')[0].offsetTop) + 'px'
              }, 600);
            } else {
              $('.el-dialog__wrapper').animate({
                scrollTop: ($('.el-form-item.is-error')[0].offsetTop) + 'px'
              }, 600);
            }
          })
        }
      });
    },
    // 商品分类动态请求 specs,sku选项
    categoryChange(val) {
      let self = this;
      val = val[val.length - 1];
      let path = util.tree.findPath(val, { value: "id", data: self.cateGorys });
      if (path.length == 1) return; //只选一级不进行选择
      // 删除规格和规格属性
      self.skuGeneratedList = [];
      self.skuItemList = [];
      util.ajax({
        _notLoading: true,
        type: "GET",
        url: util.ajaxPath() + "/goods/sku/" + val,
        success: function(res) {
          if (res.status == "success") {
            self.skuSelectList = res.data;
          } else {}
        }
      });
      util.ajax({
        _notLoading: true,
        type: "GET",
        url: util.ajaxPath() + "/category_attr/" + val + "/show",
        success: function(res) {
          if (res.status == "success") {
            self.specsShowList = res.data;
          } else {}
        }
      })
    },
    //Sku相关函数******************START
    addSkuItem() {
      this.skuItemList.push({ checks: [] })
      this.skuItemListBack = util.clone(this.skuItemList);
    },
    deleteSkuItem(index) {
      this.skuItemList.splice(index, 1);
      this.skuItemListBack = util.clone(this.skuItemList);
      this.skuItemAllCheckBoxList.splice(index, 1);
    },
    /**
     *  排列组合 二维数组
     */
    getExchangeResult(skuCheckList) {
      let results = [];
      let result = [];
      doExchange(skuCheckList, 0);

      function doExchange(arr, index) {
        for (var i = 0; i < arr[index].length; i++) {
          result[index] = arr[index][i];
          if (index != arr.length - 1) {
            doExchange(arr, index + 1)
          } else {
            results.push(result.join(','))
          }
        }
      }
      return results;
    },
    generateSkuList() {
      let self = this;
      let skuGList = [];
      let skuCheckList = (function(list) {
        let l = [];
        for (let item of list) {
          if (item.checks && item.checks.length) l.push(item.checks);
        }
        return l;
      })(self.skuItemList)
      if (!skuCheckList.length) {
        this.$message.warning('未添加商品规格属性');
        return;
      }
      //进行排列组合 START
      let results = self.getExchangeResult(skuCheckList);
      //进行排列组合 END
      let lastSkuGeneratedList = util.clone(self.skuGeneratedList);
      for (let attr_name of results) {
        let has = false;
        for (let lastItem of lastSkuGeneratedList) {
          if (lastItem.attr_name == attr_name) {
            skuGList.push(util.clone(lastItem));
            has = true;
            break;
          }
        }
        if (!has) {
          skuGList.push({
            attr_name: attr_name,
            attr_values: "",
            price: "",
            cost_price: "",
            stock: "",
            retail_stock: "",
            weight: "",
            image: [],
          })
        }
      }
      if (!skuGList.length) {
        this.$message.warning('未添加商品规格属性');
        return;
      }
      self.skuGeneratedList = skuGList;
      //通过attr_values获取对应 attr_name
      function getAttrNameByAttrValues(attr_values) {
        let valuesArr = attr_values.split(',');
        let nameArr = [];
        for (let item of valuesArr) {
          nameArr.push(self.skuItemChecksMap[item]);
        }
        return nameArr.toString();
      }
    },
    deleteSkuGItem(index) {
      this.skuGeneratedList.splice(index, 1);
    },
    skuItemSelect(index) {
      let self = this;
      let categoryId = this.skuItemList[index].categoryId;
      // 重复判断
      let skuItemList = util.clone(this.skuItemList);
      let map = {};
      for (let item of skuItemList) {
        if (map[item.categoryId]) {
          self.$message.warning('重复的规格');
          self.skuItemList[index].categoryId = self.skuItemListBack[index].categoryId;
          return;
        } else {
          map[item.categoryId] = true;
        }
      }
      self.skuItemListBack = util.clone(self.skuItemList);
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/sku/find/" + categoryId,
        success: function(res) {
          if (res.status == "success") {
            // 更新 skuItemChecksMap;
            for (let item of res.data) {
              self.skuItemChecksMap[item.id] = item.name;
            }
            self.skuItemAllCheckBoxList.splice(index, 1, res.data);
          } else {}
        }
      })
    },
    //Sku相关函数******************END
  },
  mounted() {
    let self = this;
    this.init();
  }
};
</script>