<template>
  <div class="login-container">
    <el-form class="login-form" @submit.native.prevent :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">{{msg}}</h3>
      <el-form-item prop="username">
        <el-input name="username" type="text" maxlength="20" v-model.trim="loginForm.username" placeholder="账户名" clearable/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" maxlength="20" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
          placeholder="请输入密码（随便输）"></el-input>
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-view"></i>
          </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loginLoading" @click.native.prevent="handleLogin">
          登录系统
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'login',
  data () {
    // login--validate, 校验方式
    const form = this.$store.state.login.form
    const validateUsername = (rule, value, callback) => {
      if (value !== form.username) {
        callback(new Error(`账户名默认：${form.username}`))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 登录密码
      loginForm: {
        username: form.username,
        password: ''
      },
      // 校验规则
      loginRules: {
        username: [{ required: true, trigger: form.trigger, validator: validateUsername }],
        password: [{ required: true, trigger: form.trigger, validator: validatePassword }]
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
            console.log(res.data)
            if (result === '1') {
              this.$router.push({ path: '/onload' })
            } else {
              Message({
                message: '请求异常，稍后重试',
                type: 'warning'
              })
              return false
            }
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="less">
@bg:#2d3a4b;
@light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="less" scoped>
@bg:#2d3a4b;
@dark_gray:#889aa4;
@light_gray:#eee;
@bg_form: #333;
@bg_shadow: #545454;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: @bg;
  .login-form {
    position: absolute;
    left: 50%;
    top: 40%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    transform: translate(-50%, -50%);
    background-color: @bg_form;
    border-radius: 10px;
    box-shadow: 0 0 10px @bg_shadow;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: @light_gray;
    margin: 0px auto 50px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
