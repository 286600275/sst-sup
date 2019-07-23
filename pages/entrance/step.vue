<style lang="less">
@import "~assets/css/base.less";

.step-container {
  min-width: 1040px;
  position: relative;
  border-top: 1px solid transparent;
}

.step-bg {
  background: url("~assets/img/step-bg.png");
  padding-bottom: 50%;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: contain;
  z-index: -1;
}

.step-panel {
  width: 80%;
  max-width: 1100px;
  margin: 22% auto 0;

  .tip {
    border-radius: 4px;
    background: #a7c4ed;
    color: #fff;
    font-size: 14px;
    line-height: 30px;
    text-indent: 14px;
  }

  .step-progress-card {
    margin-top: 10px;

    .el-card__header {
      font-size: 20px;
    }

    .progress-step {
      width: 80%;
      margin: 0 auto;

      .el-step__icon-inner {
        font-size: 20px;
      }
    }
  }

  .step-wrapper {
    position: relative;
    margin-top: 10px;

    .step-temp {
      // background: #fff;
      min-height: 1000px;
    }
  }

  .step-content-card {
    margin-bottom: 40px;
    width: 100%;

    &.step-item3 {
      margin-bottom: 140px;
    }
  }

  .next-action {
    display: block;
    margin: 20px auto;
    text-align: center;
  }

  .step-item {
    transition: all .3s;
    display: inline-block;
    z-index: 999;
    margin-right: 10px;
  }

  .step-leave-to {
    opacity: 0;
    // transform: translateX(-30px);
  }

  .step-enter {
    opacity: 0;
    // transform: translateX(30px);
  }

  .step-leave-active,
  .step-enter-active {
    position: absolute;
  }
}
</style>
<template>
  <div class="step-container">
    <div class="step-bg">
    </div>
    <div class="step-panel">
      <div class="tip"> 供应商名称和主营项目审核后将无法修改，请谨慎填写 </div>
      <el-card class="step-progress-card">
        <div slot="header" class="clearfix">
          <span>供应商入驻申请进度</span>
        </div>
        <el-steps finish-status="success" class="progress-step" :active="stepIndex-1" simple style="margin-top: 0px">
          <el-step title="在线协议" icon="iconfont icon-file"></el-step>
          <el-step title="入驻申请" icon="iconfont icon-shangjia"></el-step>
          <el-step title="公司资质审核" icon="iconfont icon-shenhexitong"></el-step>
        </el-steps>
      </el-card>
      <div class="step-wrapper" v-if="stepAjaxSuccess">
        <transition name="step" mode="out-in" v-on:before-leave="beforeLeave" v-on:after-enter="afterEnter">
          <Step1 ref="step1" @goStep="goStep" class="step-item step-item1 step-content-card" v-if="stepIndex==1" key="step1"></Step1>
          <Step2 @goStep="goStep" class="step-item step-item2 step-content-card" v-if="stepIndex==2" key="step2"></Step2>
          <Step3 @goStep="goStep" :stepSuccess="stepSuccess" class="step-item step-item3 step-content-card" v-if="stepIndex==3" key="step3"></Step3>
        </transition>
        <div class="step-temp" v-show="stepBackVisible"></div>
      </div>
    </div>
  </div>
</template>
<script>
import util from '~/utils/common'
import Step1 from '~/components/step/step1.vue'
import Step2 from '~/components/step/step2.vue'
import Step3 from '~/components/step/step3.vue'
export default {
  props: [],
  components: { Step1, Step2, Step3 },
  created() {},
  data() {
    return {
      stepBackVisible: false,
      stepIndex: 1,
      stepAjaxSuccess: false,
      stepSuccess: true,
      // 
      // stepBackVisible: true,
      // stepIndex: 1,
      // stepAjaxSuccess: true,
      // stepSuccess: true,
    }
  },
  watch: {},
  methods: {
    goStep(index) {
      let self = this;
      self.stepIndex = index;
      switch (index) {
        case 2:
          $('html,body').animate({ scrollTop: '300px' }, 600);
          break;
        case 3:
          $('html,body').animate({ scrollTop: '230px' }, 600);
          break;
      }
    },
    beforeLeave() {
      if (this.$refs['step1']) this.$refs['step1'].hidePdf();
      this.stepBackVisible = true;
    },
    afterEnter() {
      this.stepBackVisible = false;
    }
  },
  mounted() {
    // return;
    let self = this;
    util.ajax({
      url: util.ajaxPath() + "/user/join/step",
      type: "get",
      success: function(res) {
        if (res.status == "success") {
          self.stepIndex = res.step;
          self.goStep(self.stepIndex)
          self.stepAjaxSuccess = true;
          if (res.step == 10) {
            util.message.success('您的入驻申请已经通过资质审核！即将前往管理系统...');
            setTimeout(function() {
              window.location.href = "/frame/pro/pro-list";
            }, 3000)
          } else if (res.step == 11) {
            self.stepIndex = 3;
            self.$store.commit('updateStepData', res.data);
            localStorage.setItem('last-step-index', 11);
            self.goStep(self.stepIndex);
          } else {
            localStorage.removeItem('last-step-index');
          }
        }
      }
    })
  },
  computed: {},
  head: {},
}
</script>