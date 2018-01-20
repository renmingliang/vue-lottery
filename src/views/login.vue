<template>
  <div class="login-container">
    <div class="login-inner">
      <el-form class="login-form" @submit.native.prevent :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div class="title-container">
          <h3 class="title">民太安集团年会抽奖系统</h3>
        </div>
        <el-form-item prop="password">
          <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码"/>
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
        </el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">进入</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../api'
export default {
  name: 'login',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 10) {
        callback(new Error('密码不能少于10个长度'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        password: 'baoqU@2017'
      },
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          login(this.loginForm).then((res) => {
            this.loading = false
            this.$router.push({ path: '/onload' })
          }).catch((err) => {
            this.loading = false
            console.log(err)
          })
        } else {
          alert('密码错误')
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
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background-image: url(../assets/images/login.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 576px;
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
