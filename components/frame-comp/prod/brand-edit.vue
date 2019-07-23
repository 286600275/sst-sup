<style lang="less" scoped> .licence_download_href{
  color: #188eee;
  text-decoration: none;
  margin-top:10px;
}
.licence_img_tip{
  color: #9db7c3;
}
</style>
<template>
  <div>
    <el-dialog @close="dialogClose" :close-on-click-modal="false" top="5vh" :title="type=='add'?'添加品牌':'重新添加'" class="large-dialog" :visible.sync="dialogVisible">
      <el-form label-width="130px" ref="form" :model="form" :rules="formRules">
        <!-- 品牌选择 -->
        <el-form-item required label="品牌选择" prop="brand_id">
          <el-select v-model="form.brand_id" filterable>
            <el-option v-for="item in brandOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 商标注册号 -->
        <el-form-item required label="商标注册号" prop="register_number">
          <el-input v-model="form.register_number"> </el-input>
        </el-form-item>
        <!-- 品牌名称 -->
        <el-form-item required label="品牌名称" prop="name">
          <el-input v-model="form.name"> </el-input>
        </el-form-item>
        <!-- 品牌英文名称 -->
        <el-form-item required label="品牌英文名称" prop="en_name">
          <el-input v-model="form.en_name"> </el-input>
        </el-form-item>
        <!-- 品牌LOGO -->
        <el-form-item required label="品牌LOGO" prop="logo_img">
          <Upload2 uploadFolder="brand_logo" :attrs="{hideAdd:true,limit:1,listType:'picture-card'}" v-model="form.logo_img"></Upload2>
        </el-form-item>
        <!-- 品牌介绍 -->
        <el-form-item label="品牌介绍" prop="desc">
          <el-input v-model="form.desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"> </el-input>
        </el-form-item>
        <!-- 品牌故事 -->
        <el-form-item label="品牌故事" prop="story">
          <el-input v-model="form.story" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"> </el-input>
        </el-form-item>
        <!-- 品牌资质 -->
        <el-form-item label="品牌资质" prop="is_self">
          <el-radio-group v-model="form.is_self">
            <el-radio :label="0">代理品牌</el-radio>
            <el-radio :label="1">自主品牌</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 品牌所在地 -->
        <el-form-item v-if="form.is_self==0" required label="品牌所在地" prop="province">
          <el-select filterable v-model="form.province">
            <el-option v-for="item in provinceOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 代理等级 -->
        <el-form-item v-if="form.is_self==0" required label="代理等级" prop="agent_level">
          <el-select v-model="form.agent_level">
            <el-option label="一级代理" :value="1"> </el-option>
            <el-option label="多级代理" :value="2"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 代理授权书 -->
        <el-form-item v-if="form.is_self==0 && form.agent_level" required :label="(form.agent_level=='1'?'一级':'多级')+'代理授权书'" prop="licence_img">
          <span class="licence_img_tip">请上传代理授权书</span>
          <el-popover ref="popover-brand-detail" width="600" placement="right" trigger="hover"><template>
              <h4>品牌审核细则</h4> 1.合作方为经销商或代理商的请提供品牌方开出的逐级授权书，或正规采购合同及进货发票，保证授权链条完整<br> 2.商标持有人为个人注册的，需要注册人开具商标授权书给合作方公司，并提供个人身份证签字<br> 3.授权书约定的销售范围无限制或者明确说明可以在“兽兽淘平台”销售，并且授权书的授权时间在有效期内<br> 4.提交品牌信息则需要提供品牌商标注册号/申请号、品牌名称、品牌LOGO、品牌资质、品牌授权书、品牌商标注册证或注册申请受理通知书<br> 5.授权原则：<br>&nbsp;&nbsp;(1)自有品牌：商标持有人既是供应商，仅提供商标注册证即可。<br>&nbsp;&nbsp;(2)代理品牌：由商标持有人授权至供应商（存在逐级授权），此类型包括一级代理，即商标持有人直接授权至供应商；也包括多级代理，即商标持有人授权至B，B授权至供应商（或B授权C,C授权至供应商，以此类推）的多级授权代理品牌。<br> 6.提交品牌审核的时候需要注意以下问题：<br>&nbsp;&nbsp;(1)商标注册证<br>&nbsp;&nbsp;&nbsp;&nbsp;A.商家填写的注册号与注册证右上角一致（不能包含除“G”以外的任何汉字及字母）<br>&nbsp;&nbsp;&nbsp;&nbsp;B.R标——填写的“商标注册号”一栏与上传的商标注册证右上角的编号保持一致<br>&nbsp;&nbsp;&nbsp;&nbsp;C.TM标——填写的商标申请号与商标注册申请受理通知书上的保持一致 <br>&nbsp;&nbsp;(2)若商品注册证已到期，请将注册证与续展证明放一起拍照上传且需要保证图片的清晰完整。<br>&nbsp;&nbsp;(3)商标注册人及授权书（每张授权书都要加盖授权单位红色公章）<br>&nbsp;&nbsp;&nbsp;&nbsp;A.请上传商标注册人的授权书（若为多级授权请逐级上传完整的系列授权书）<br>&nbsp;&nbsp;&nbsp;&nbsp;B.自然人持有的商标：注册证或受理书需持有人签名<br>&nbsp;&nbsp;&nbsp;&nbsp;C.自然人授权书：自然人的授权还需提供经过商标注册人签名的身份证正反两面复印件<br> &nbsp;&nbsp;&nbsp;&nbsp;D.商标注册证为复印件，则需加盖供应商单位红章
            </template> </el-popover>
          <div style="line-height: 20px;margin-bottom: 14px; color: #9db7c3">
            <a v-popover:popover-brand-detail class="licence_download_href" href="javascript:void(0);">查看品牌审核细则</a> & <a class="licence_download_href" href="/file/兽兽淘品牌代理授权说明&模板.doc">下载代理授权书模板.doc</a>
          </div>
          <Upload2 uploadFolder="brand_licence" :attrs="{listType:'picture-card'}" v-model="form.licence_img"></Upload2>
        </el-form-item>
        <!-- 授权书有效期限 -->
        <el-form-item v-if="form.is_self==1" required label="授权书有效期限" prop="daterange_licence">
          <el-date-picker value-format="yyyy-MM-dd" align="right" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.daterange_licence">
          </el-date-picker>
        </el-form-item>
        <!-- 商标类型 -->
        <el-form-item required label="商标类型" prop="brand_type">
          <el-radio-group v-model="form.brand_type">
            <el-radio :label="1">R标</el-radio>
            <el-radio :label="0">TM标</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 商标注册书 -->
        <el-form-item required label="商标注册书" prop="register_img">
          <Upload2 uploadFolder="register_img" :attrs="{hideAdd:true,limit:1,listType:'picture-card'}" v-model="form.register_img"></Upload2>
        </el-form-item>
        <!-- 注册有效期限 -->
        <el-form-item required label="注册有效期限" prop="daterange_register">
          <el-date-picker value-format="yyyy-MM-dd" align="right" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.daterange_register">
          </el-date-picker>
        </el-form-item>
        <!-- 分类 -->
        <el-form-item required label="分类" prop="class_id">
          <el-select v-model="form.class_id" multiple style="width: 350px;">
            <el-option v-for="item in classIdsOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button @click="submit" type="primary">保存并发布</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
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
    this.formDefault = {
      brand_id: "",
      register_number: "",
      name: "",
      en_name: "",
      logo_img: [],
      desc: "",
      story: "",
      is_self: 1,
      province: "",
      agent_level: "",
      licence_img: [],
      daterange_licence: [],
      brand_type: 1,
      register_img: [],
      daterange_register: [],
      class_id: [],
    };
    return {
      dialogVisible: false,
      type: "add",
      brandOptions: [], //品牌选择selectOptions
      classIdsOptions: [], //品牌分类selectOptions
      provinceOptions: util.filterData(util.c.provinceList, {
        value: (d) => d.name,
        label: (d) => d.name
      }),
      form: util.clone(this.formDefault),
      formRules: {
        brand_id: [util.c.rules.defaultRequired],
        register_number: [util.c.rules.defaultRequired],
        name: [util.c.rules.defaultRequired],
        en_name: [util.c.rules.defaultRequired],
        province: [util.c.rules.defaultRequired],
        agent_level: [util.c.rules.defaultRequired],
        licence_img: [{ required: true, message: "请至少上传一张图片", trigger: 'change', type: "array" }],
        daterange_licence: [{ required: true, message: util.c.tip.required, trigger: 'change', type: "array" }],
        logo_img: [{ required: true, message: "请上传一张图片", trigger: 'change', type: "array" }],
        register_img: [{ required: true, message: "请至少上传一张图片", trigger: 'change', type: "array" }],
        daterange_register: [{ required: true, message: util.c.tip.required, trigger: 'change', type: "array" }],
        class_id: [util.c.rules.defaultRequired],
      }
    };
  },
  methods: {
    dialogClose() {
      this.form = this.formDefault;
      this.$nextTick(function() {
        this.$refs['form'].clearValidate();
      })
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
      // 初始化分类下拉
      util.ajax({
        type: "GET",
        url: util.ajaxPath() + "/category/getcategory",
        success: function(res) {
          if (res.status == "success") {
            self.classIdsOptions = util.filterData(res.data, {
              value: (d) => d.id + '',
              label: (d) => d.name
            })
          } else {}
        }
      })
    },
    show(data) {
      let self = this;
      self.type = data ? "edit" : "add";
      self.dialogVisible = true;
      if (data) {
        let form = util.clone(data);
        form.daterange_register = [
          moment(data.register_start * 1000).format('YYYY-MM-DD'),
          moment(data.register_end * 1000).format('YYYY-MM-DD')
        ];
        form.daterange_licence = [
          moment(data.licence_start * 1000).format('YYYY-MM-DD'),
          moment(data.licence_end * 1000).format('YYYY-MM-DD')
        ];
        form.logo_img = [{
          url: data.logo_img,
        }];
        if (data.brandprofilelicence && data.brandprofilelicence.length) {
          form.licence_img = util.filterData(data.brandprofilelicence, {
            url: (d) => d.licence_img,
            d: (d) => d.id
          })
        } else {
          form.licence_img = [];
        }
        form.register_img = [{
          url: data.register_img,
        }];
        if (data.brandprofilecategory) {
          let class_id = [];
          for (let item of data.brandprofilecategory) {
            class_id.push(item.class_id + '');
          }
          form.class_id = class_id;
        } else {
          form.class_id = [];
        }
        self.form = form;
      } else {
        self.form = util.clone(self.formDefault)
      }
    },
    submit() {
      let self = this;
      self.$refs['form'].validate((valid) => {
        if (valid) {
          let form = util.clone(this.form);
          if (form.id) {
            form.step_id = 11;
            form.brand_profile_id = form.id
          } else {
            form.step_id = 1
          };
          form.register_start = Math.floor(moment(form.daterange_register[0]).valueOf() / 1000);
          form.register_end = Math.floor(moment(form.daterange_register[1]).valueOf() / 1000);
          // 如果传key就这么改
          form.logo_img = util.getUrlPathKey(util.img.urlObj2String(form.logo_img[0]));
          form.register_img = util.getUrlPathKey(util.img.urlObj2String(form.register_img[0]));
          if (form.daterange_licence) {
            form.licence_start = Math.floor(moment(form.daterange_licence[0]).valueOf() / 1000);
            form.licence_end = Math.floor(moment(form.daterange_licence[1]).valueOf() / 1000);
            // 代理授权书多张
            form.licence_img = util.filterData(form.licence_img, (d) => util.getUrlPathKey(util.img.urlObj2String(d))).toString();
          };
          form.class_id = form.class_id.toString();
          util.ajax({
            type: form.id ? "PUT" : "POST",
            url: util.ajaxPath() + "/brand" + (form.id ? ("/" + form.id) : ""),
            data: JSON.stringify(form),
            success: function(res) {
              if (res.status == "success") {
                util.message.success("操作成功！");
                self.$emit('brand-submit-success');
                self.dialogVisible = false;
              } else {}
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
    }
  },
  mounted() {
    this.init();
  }
};
</script>