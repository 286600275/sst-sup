<style lang="less"> @import "~assets/css/base.less";

.verifying-p {
  text-align: center;
  margin: 30px;

  i {
    font-size: 60px;
    color: @ht1;
  }
}

.verifying-t {
  font-size: 20px;
  display: block;
  width: 412px;
  text-align: center;
  margin: 0 auto 100px;
}
</style>
<template>
  <div>
    <el-card>
      <div class="verifying-p"><i class="iconfont icon-shenhe"></i></div>
      <div v-if="!fail">
        <span class="verifying-t">您已完成公司资质填写流程，我们正在审核您填写的信息中...</span>
      </div>
      <div v-else>
        <div class="verifying-t">审核失败！</div>
        <div style="text-align: center;">
          <el-button type="success" @click="goStep2">返回上一步</el-button>
          <el-button type="primary" @click="showCase">查看原因</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: [],
  components: {},
  created() {},
  data() {
    return {
      util: util,
      fail: false,
    }
  },
  methods: {
    goStep2() {
      let self = this;
      self.$store.commit('updateStepStatus', 2);
      self.$emit('goStep', 2);
    },
    showCase() {
      this.$alert(this.stepData.bz, '失败原因', {
        confirmButtonText: '确定',
        callback: action => {}
      });
    },
  },
  mounted() {
    let step = localStorage.getItem('last-step-index');
    if (step == 11) {
      this.fail = true;
    } else {
      this.fail = false;
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