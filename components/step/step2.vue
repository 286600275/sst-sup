<style></style>
<template>
  <div>
    <el-card>
      <el-form label-width="220px" ref="step2Form" :model="step2Form" :rules="step2FormRules">
        <!-- 公司名称 -->
        <el-form-item required label="公司名称" prop="name">
          <el-input v-model="step2Form.name"></el-input>
        </el-form-item>
        <!-- 申请人姓名 -->
        <el-form-item required label="申请人姓名" prop="operator">
          <el-input v-model="step2Form.operator"></el-input>
        </el-form-item>
        <!-- 申请人职位 -->
        <el-form-item required label="申请人职位" prop="operator_position">
          <el-input v-model="step2Form.operator_position"></el-input>
        </el-form-item>
        <!-- 申请人固定电话 -->
        <el-form-item required label="申请人固定电话" prop="tel">
          <el-input v-model="step2Form.tel"></el-input>
        </el-form-item>
        <!-- 申请人移动电话 -->
        <el-form-item required label="申请人移动电话" prop="phone">
          <el-input v-model="step2Form.phone"></el-input>
        </el-form-item>
        <!-- 申请人邮箱 -->
        <el-form-item required label="申请人邮箱" prop="email">
          <el-input v-model="step2Form.email"></el-input>
        </el-form-item>
        <!-- 统一社会信用代码（或税号） -->
        <el-form-item required label="统一社会信用代码（或税号）" prop="uscc">
          <el-input v-model="step2Form.uscc"></el-input>
        </el-form-item>
        <!-- 营业执照 -->
        <el-form-item required label="营业执照" prop="images">
          <Upload :attrs="{multiple:true}" v-model="step2Form.images"></Upload>
        </el-form-item>
        <div class="next-action">
          <el-button @click="step2_NextStep" style="width: 240px" type="primary">下一步</el-button>
          <el-button @click='showProtocol'>查看协议</el-button>
        </div>
      </el-form>
    </el-card>
    <Protocol ref='protocol'></Protocol>
  </div>
</template>
<script>
import util from '~/utils/common'
import Upload from '~/components/utils/upload2.vue'
import Protocol from '~/components/step/protocol.vue'
export default {
  props: [],
  components: { Upload, Protocol },
  created() {},
  data() {
    return {
      util: util,
      step2Form: {
        name: "",
        operator: "",
        operator_position: "",
        tel: "",
        phone: "",
        email: "",
        uscc: "",
        images: [],
        step_id: 2,
      },
      step2FormRules: {
        name: [{ required: true, message: util.c.tip.required, trigger: 'blur' }],
        operator: [{ required: true, message: util.c.tip.required, trigger: 'blur' }],
        operator_position: [{ required: true, message: util.c.tip.required, trigger: 'blur' }],
        tel: [{ required: true, message: util.c.tip.required, trigger: 'blur' }],
        phone: [{
          pattern: util.c.regexp.phoneRegExp,
          message: util.c.tip.phoneErrorFormat,
          trigger: "blur"
        }, { required: true, message: util.c.tip.required, trigger: 'blur' }],
        email: [{ required: true, message: util.c.tip.required, trigger: 'blur' }, {
          pattern: util.c.regexp.emailRegExp,
          message: util.c.tip.emailErrorFormat,
          trigger: "blur"
        }, ],
        uscc: [{ required: true, message: util.c.tip.required, trigger: 'blur' }],
        images: [{ required: true, message: "请至少上传一张图片", trigger: 'change', type: "array" }],
      }
    }
  },
  methods: {
    step2_NextStep() {
      let self = this;
      self.$refs['step2Form'].validate((valid) => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(self.step2Form))
          params.images = util.filterData(params.images, (d) => util.getUrlPathKey(d.url));
          // delete params.img;
          // params.images = util.filterData(params.images, (d) => d.url);
          if (localStorage.getItem('last-step-index') == 11) params.step_id = 11;
          util.ajax({
            url: util.ajaxPath() + "/user/join/create",
            type: "post",
            data: JSON.stringify(params),
            success: function(res) {
              if (res.status == "success") {
                self.$store.commit('updateStepStatus', 3);
                self.$emit('goStep', 3);
                if (params.step_id == 11) {
                  localStorage.removeItem('last-step-index')
                }
              }
              if (res.status == "error") {
                util.message.error(res.message);
                return true;
              }
              //设置选项
            }
          })
        }
      });
    },
    showProtocol() {
      this.$refs['protocol'].show();
    },
  },
  mounted() {
    let step = localStorage.getItem('last-step-index');
    if (step == 11) {
      let stepData = this.stepData;
      let step2Form = {
        name: stepData.name,
        operator: stepData.operator,
        operator_position: stepData.operator_position,
        tel: stepData.tel,
        phone: stepData.phone,
        email: stepData.email,
        uscc: stepData.uscc,
        images: stepData.img.length ? util.filterData(stepData.img, { url: (d) => d.img }) : [],
        step_id: 11,
      }
      this.step2Form = step2Form;
    }
  },
  computed: {
    stepData() {
      return this.$store.getters['stepData']
    }
  },
  head: {}
}
</script>