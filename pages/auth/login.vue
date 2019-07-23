<style lang="less"> @import "~assets/css/base.less";
.login-bg {

  @media (min-height: 840px) {
  .login-container {
    min-height: 840px;
  }
  }
  @media (max-height: 841px) {
    .login-container {
      min-height: 620px;
    }
  }

  height: 100%;
  background: url("~assets/img/login-bg.png");
  position: absolute;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  perspective: 1000;
  perspective-origin: 70% 50%;
  min-width: 1200px;
  .login-loading{
    display: none;
    margin-right: 10px;
  }
  // logo
  .login-logo {
    text-align: center;
    position: absolute;
    left: 30%;
    top: 40%;
    transform: translate(-50%, -50%);
    img {
      margin-bottom: -50px;
    }
    .sys-title {
      display: inline-block;
      font-size: 40px;
      color: #fff;
      margin-top: 20px;
    }
    .sys-title-eng {
      display: inline-block;
      font-size: 16px;
      color: #ffffffc7;
      margin-top: 20px;
      letter-spacing: 1px;
    }
  }
  .login-type-card{
    position: relative;
    transition: all .14s linear;
    .card-title{
      font-size: 16px;
    }
    .el-card__header{
      padding: 20px 30px;
    }
    .el-card__body{
      padding: 20px 30px;
    }
  }
  .login-card {
    width: 500px;
    position: absolute;
    left: 70%;
    top: 45%;
    transform: translate(-50%,-50%) rotateY(-90deg);
    z-index: 99;
    .head {
      text-align: center;
    }
    &.active{
      transform: translate(-50%,-50%);
    }
  }
  .reset-card{
    width: 500px;
    position: absolute;
    left: 70%;
    top: 45%;
    transform: translate(-50%,-50%) rotateY(90deg);
     &.active{
      transform: translate(-50%,-50%);
    }
  }
  .rigister-card{
    width: 500px;
    position: absolute;
    left: 70%;
    top: 45%;
    transform: translate(-50%,-50%) rotateY(90deg);
     &.active{
      transform: translate(-50%,-50%);
    }
  }
}
// 1366以上屏幕样式
.login-form {
  margin-top: 30px;

  .el-form-item{
    position: relative;
    &.append-item{
      .el-input{
        width: 270px;
      }
      .code-btn{ 
        width: 112px;
      }
    }
    .el-form-item__content{
      position: relative;
      margin-left: 50px ! important;
    }
  }

  .login-form-icon{
    position: absolute;
    left: -50px;
    width: 25px;
    text-align: center;
    font-size: 20px;
    color:#999;
  }
  .login-button{
    width:100%;
    margin: 20px auto  60px;
    display: block;
  }
  .other-action{
    text-decoration: none;
    color: @ht1;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .other-action-2{
    float: right;
   }
  .login-action{
    position: absolute;
    bottom: 40px;
    left: 30px;
  }
  .reset-button{
    width: 100%;
    margin: 20px auto  20px;
  }
}
// 1366以下屏幕样式
@media (max-height: 841px) {}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px white inset;
}
.login-form-item input:-webkit-autofill {}
</style>
<template>
  <!-- 系统名称、Logo -->
  <div class="login-container">
    <div class="login-bg">
      <div class="login-logo">
        <img src="~assets/img/login-logo.png" /><br />
        <span class="sys-title">兽兽淘供应商系统</span><br />
        <span class="sys-title-eng">Veterinary Shooting Supplier System </span>
      </div>
      <!-- 登录 panel1 -->
      <el-card class="login-type-card login-card" :class="{'active':loginPanelActive}">
        <div class="head"><img src="~assets/img/login-head.png" /></div>
        <div class="login-form">
          <el-form ref="loginForm" :model="form" :rules="loginFormRules" label-width="80px">
            <el-form-item prop="username">
              <span class="login-form-icon"><i class="fas fa-user"></i></span>
              <el-input v-model="form.username" placeholder="用户名" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span class="login-form-icon"><i class="fas fa-unlock-alt"></i></span>
              <el-input type="password" v-model="form.password" placeholder="密码" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
          </el-form>
          <div>
            <span class="other-action" @click="goPanel(3)">注册</span>
            <span class="other-action other-action-2" @click="goPanel(2)">忘记密码</span>
          </div>
          <el-button class="login-button" type="primary" @click="submitLogin">
            <i class='fa fa-spinner fa-spin login-loading'></i>登录</el-button>
          <div class="login-action">
            <el-checkbox v-model="remember">记住密码</el-checkbox>
          </div>
        </div>
      </el-card>
      <!-- 忘记密码 panel2 -->
      <el-card class="login-type-card reset-card" :class="{'active':resetPanelActive}">
        <div slot="header" class="clearfix">
          <span class="card-title">重置密码</span>
        </div>
        <div class="login-form">
          <el-form ref="resetForm" :model="resetForm" :rules="resetFormRules" label-width="80px">
            <el-form-item class="append-item" prop="phone">
              <span class="login-form-icon"><i class="fas fa-mobile-alt"></i></span>
              <el-input @keydown.9.native="resetReadOnly=false" placeholder="手机号" v-model="resetForm.phone"></el-input>
              <el-button class="code-btn" type="primary" @click="getResetPhoneCode" :disabled="resetCodeDisabled">{{resetPhoneCodeText}}</el-button>
            </el-form-item>
            <el-form-item prop="code">
              <span class="login-form-icon"><i class="fas fa-envelope"></i></span>
              <el-input :readonly="resetReadOnly" @click.native="resetReadOnly=false" placeholder="验证码" v-model="resetForm.code"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span class="login-form-icon"><i class="fas fa-unlock-alt"></i></span>
              <el-input type="password" placeholder="设置密码" v-model="resetForm.password"></el-input>
            </el-form-item>
          </el-form>
          <div>
            <span class="other-action other-action-2" @click="goPanel(1)">登录</span>
          </div>
          <el-button class="reset-button" type="primary" @click="submitReset">提交</el-button>
        </div>
      </el-card>
      <!-- 注册 panel3 -->
      <el-card class="login-type-card rigister-card" :class="{'active':rigisterPanelActive}">
        <div slot="header" class="clearfix">
          <span class="card-title">注册</span>
        </div>
        <div class="login-form">
          <el-form ref="rigisterForm" :model="rigisterForm" :rules="rigisterFormRules" label-width="80px">
            <el-form-item class="append-item" prop="phone">
              <span class="login-form-icon"><i class="fas fa-mobile-alt"></i></span>
              <el-input @keydown.9.native="rigisterReadOnly=false" placeholder="手机号" v-model="rigisterForm.phone"></el-input>
              <el-button class="code-btn" type="primary" @click="getRigisterPhoneCode" :disabled="rigisterCodeDisabled">{{rigisterPhoneCodeText}}</el-button>
            </el-form-item>
            <el-form-item prop="code">
              <span class="login-form-icon"><i class="fas fa-envelope"></i></span>
              <el-input :readonly="rigisterReadOnly" @click.native="rigisterReadOnly=false" placeholder="验证码" v-model="rigisterForm.code"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <span class="login-form-icon"><i class="fas fa-unlock-alt"></i></span>
              <el-input type="password" placeholder="设置密码" v-model="rigisterForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <span class="login-form-icon"><i class="fas fa-unlock"></i></span>
              <el-input type="password" placeholder="重复密码" v-model="rigisterForm.repassword"></el-input>
            </el-form-item>
          </el-form>
          <div>
            <span class="other-action other-action-2" @click="goPanel(1)">登录</span>
          </div>
          <el-button class="reset-button" type="primary" @click="submitRigister">注册</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: [],
  components: {},
  created() {},
  data() {
    let self = this;
    return {
      util: util,
      loginPanelActive: true,
      resetPanelActive: false,
      rigisterPanelActive: false,
      // 重置密码 
      resetCodeSendSeconds: 60,
      resetCodeInterval: null,
      resetCodeSending: false,
      resetReadOnly: true,
      // 注册用户 
      rigisterCodeSendSeconds: 60,
      rigisterCodeInterval: null,
      rigisterCodeSending: false,
      rigisterReadOnly: true,
      //
      remember: '',
      form: {
        username: "",
        password: ""
      },
      resetForm: {
        phone: "",
        code: "",
        password: "",
        verification_key: "",
      },

      rigisterForm: {
        phone: "",
        code: "",
        email: "",
        password: "",
        repassword: "",
        verification_key: "",
      },
      loginFormRules: {
        username: [{
          required: true,
          message: util.c.tip.required
        }],
        password: [{
          required: true,
          message: util.c.tip.required
        }],
      },
      resetFormRules: {
        phone: [{
          required: true,
          message: util.c.tip.required
        }, {
          pattern: util.c.regexp.phoneRegExp,
          message: util.c.tip.phoneErrorFormat,
          trigger: "blur"
        }],
        code: [{
          required: true,
          message: util.c.tip.required
        }],
        password: [{
          required: true,
          message: util.c.tip.required
        }],
      },
      rigisterFormRules: {
        phone: [{
          required: true,
          message: util.c.tip.required
        }, {
          pattern: util.c.regexp.phoneRegExp,
          message: util.c.tip.phoneErrorFormat,
          trigger: "blur"
        }],
        code: [{
          required: true,
          message: util.c.tip.required
        }],
        password: [{
          required: true,
          message: util.c.tip.required
        }],
        repassword: [{
          required: true,
          message: util.c.tip.required
        }, {
          trigger: "blur",
          validator: function(rule, value, callback) {
            if (value != self.rigisterForm.password) {
              callback([util.c.tip.newpassInconsistent])
            } else {
              callback();
            }
          }
        }],
      }
    }
  },
  watch: {},
  methods: {
    getResetPhoneCode() {
      let self = this;
      // 进行操作
      util.ajax({
        loadingClear_: true,
        url: util.ajaxPath() + "/oauth/forget/sms",
        type: "post",
        data: JSON.stringify({
          mobile: self.resetForm.phone
        }),
        success: function(res) {
          if (res.status == "success") {
            util.message.success("验证码发送成功");
            self.resetForm.verification_key = res.verification_key
          }
        }
      });
      // 倒计时
      self.resetCodeSending = true;
      self.resetCodeSendSeconds = 59;
      self.resetCodeInterval = setInterval(function() {
        self.resetCodeSendSeconds--;
        if (self.resetCodeSendSeconds == 0) {
          clearInterval(self.resetCodeInterval);
          self.resetCodeSending = false;
        }
      }, 1000)
    },
    getRigisterPhoneCode() {
      let self = this;
      // 进行操作
      util.ajax({
        loadingClear_: true,
        url: util.ajaxPath() + "/oauth/register/sms",
        type: "post",
        data: JSON.stringify({
          mobile: self.rigisterForm.phone
        }),
        success: function(res) {
          if (res.status == "success") {
            util.message.success("验证码发送成功");
            self.rigisterForm.verification_key = res.verification_key
          }
        }
      });
      // 倒计时
      self.rigisterCodeSending = true;
      self.rigisterCodeSendSeconds = 59;
      self.rigisterCodeInterval = setInterval(function() {
        self.rigisterCodeSendSeconds--;
        if (self.rigisterCodeSendSeconds == 0) {
          clearInterval(self.rigisterCodeInterval);
          self.rigisterCodeSending = false;
        }
      }, 1000)
    },
    /**
     * 登录Action
     */
    submitLogin: function({ username, password } = {}) {
      var self = this;
      if (username) { doAjax(); return }
      self.$refs['loginForm'].validate((valid) => {
        if (valid) {
          doAjax();
        }
      });

      function doAjax() {
        util.ajax({
          _notLoading: true,
          url: util.ajaxPath() + "/oauth/login",
          type: "post",
          data: JSON.stringify({
            username: username || self.form.username,
            password: password || self.form.password,
          }),
          beforeSend: function() {
            $('.login-loading').css('display', 'inline-block');
          },
          complete: function() {},
          success: function(res) {
            if (res.status == "success") {
              self.$store.dispatch('loginSuccess', {
                token: res.token.access_token,
                username: username || self.form.username
              });
              // 记录用户名密码
              if (self.remember) {
                self.$store.commit('auth/updateUserMember', {
                  username: self.form.username,
                  password: self.form.password,
                })
              }
              if (res.step_status != 10) { //调整入驻相关
                self.$store.commit('updateStepStatus', res.step_status);
                window.location.href = "/entrance/step"
              } else {
                window.location.href = "/frame/pro/pro-list"
              }
            } else {
              $('.login-loading').css('display', 'none');
            }
            if (res.status == "error") {
              util.message.error("登录失败,请确认账号密码是否正确");
              return true;
            }
            //设置选项
          },
          error: function() {
            $('.login-loading').css('display', 'none');
          }
        })
      }
    },
    /**
     * 重置密码Action
     */
    submitReset() {
      let self = this;
      self.$refs['resetForm'].validate((valid) => {
        if (valid) {
          util.ajax({
            loadingClear_: true,
            url: util.ajaxPath() + "/oauth/forget",
            type: "post",
            data: JSON.stringify({
              verification_key: self.resetForm.verification_key,
              verification_code: self.resetForm.code,
              mobile: self.resetForm.phone,
              password: self.resetForm.password,
            }),
            success: function(res) {
              if (res.status == "success") {
                util.message.success("密码重置成功！");
                self.goPanel(1);
              }
            }
          });
        }
      })
    },
    /**
     * 重置密码Action
     */
    submitRigister() {
      let self = this;
      self.$refs['rigisterForm'].validate((valid) => {
        if (valid) {
          util.ajax({
            loadingClear_: true,
            url: util.ajaxPath() + "/oauth/register",
            type: "post",
            data: JSON.stringify({
              verification_key: self.rigisterForm.verification_key,
              verification_code: self.rigisterForm.code,
              mobile: self.rigisterForm.phone,
              password: self.rigisterForm.password,
              email: self.rigisterForm.email
            }),
            success: function(res) {
              if (res.status == "success" || res.access_token) {
                util.message.success("注册成功！即将前往商家入驻界面！");
                self.$store.dispatch('loginSuccess', {
                  token: res.access_token,
                  username: self.rigisterForm.phone
                });
                setTimeout(function() {
                  window.location.href = "/entrance/step";
                }, 2000)
              }
              if (res.status == "error") {
                util.message.error(res.message)
                return true;
              }
            }
          });
        }
      })
    },
    goPanel(index, fromIndex) {
      let self = this;
      $('.login-type-card').eq(index - 1).css('z-index', 1).siblings().css('z-index', -999);
      switch (index) {
        case 1:
          self.resetPanelActive = false;
          self.rigisterPanelActive = false;
          self.$refs['resetForm'].resetFields();
          self.$refs['rigisterForm'].resetFields();
          setTimeout(function() {
            self.loginPanelActive = true;
          }, 140)
          break;
        case 2:
          self.loginPanelActive = false;
          setTimeout(function() {
            self.resetPanelActive = true;
          }, 140)
          break;
        case 3:
          self.loginPanelActive = false;
          setTimeout(function() {
            self.rigisterPanelActive = true;
          }, 140)
          break;
      }
    },
  },
  mounted() {
    let self = this;
    let userMember = self.$store.getters['auth/userMember'];
    if (userMember) {
      self.submitLogin(userMember)
    }
  },
  computed: {
    resetCodeDisabled() {
      return this.resetCodeSending || (!util.c.regexp.phoneRegExp.test(this.resetForm.phone))
    },
    resetPhoneCodeText() {
      let self = this;
      if (self.resetCodeSending) {
        return self.resetCodeSendSeconds + " s";
      } else {
        return "获取验证码"
      }
    },
    rigisterCodeDisabled() {
      return this.rigisterCodeSending || (!util.c.regexp.phoneRegExp.test(this.rigisterForm.phone))
    },
    rigisterPhoneCodeText() {
      let self = this;
      if (self.rigisterCodeSending) {
        return self.rigisterCodeSendSeconds + " s";
      } else {
        return "获取验证码"
      }
    }
  },
  head: {},
}
</script>