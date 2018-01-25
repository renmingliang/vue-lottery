<template>
  <div class="login-container">
    <div class="login-inner">
      <el-form class="login-form" @submit.native.prevent :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title-container">
          <h3 class="title">{{msg}}</h3>
        </div>
        <el-form-item prop="password">
          <el-input name="username" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.username" autoComplete="on" placeholder="请输入密码"/>
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
        </el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loginLoading" @click.native.prevent="handleLogin">进入</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    // login--validate, 校验方式
    const form = this.$store.state.login.form
    const validatePassword = (rule, value, callback) => {
      if (value.length < form.username.length) {
        callback(new Error(`密码不能少于${form.username.length}个长度`))
      } else {
        callback()
      }
    }
    return {
      // 登录密码
      loginForm: {
        username: form.username
      },
      // 校验规则
      loginRules: {
        username: [{ required: true, trigger: form.trigger, validator: validatePassword }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'msg',
      'passwordType',
      'loginLoading'
    ])
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.$store.commit({type: 'TOGGLE_TYPE', value: ''})
      } else {
        this.$store.commit({type: 'TOGGLE_TYPE', value: 'password'})
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch({type: 'postLogin', data: this.loginForm}).then(res => {
            const result = res.data.result
            if (result === '1') {
              this.$router.push({ path: '/onload' })
            } else {
              alert('请输入正确的密码')
              return false
            }
          })
        } else {
          alert('请输入正确密码')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less">
/* reset element-ui css */
.login-container {
  .el-input {
    width: 90%;
    float: left;
    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item__error{
    color: #000;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #fff;
    border-radius: 5px;
  }
}
</style>
<style lang="less" scoped>
.login-container{
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  position: relative;
  .login-inner{
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 520px;
    height: 576px;
    padding: 35px 35px 15px 35px;
    transform: translate3d(-50%, -50%, 0);
    background: url(../assets/images/login.jpg) no-repeat;
    background-size: 100% 100%;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.58);
    border-radius: 25px;
    .login-form{
      .title-container{
        margin-top: 90px;
        margin-bottom: 90px;
        font-size: 30px;
        h3{
          font-weight: bold;
        }
      }
    }
  }
}
</style>
