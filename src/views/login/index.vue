<template>
  <div class="login-container">
    <el-form
      class="login-form"
      @submit.prevent
      :model="loginForm"
      :rules="loginRules"
      ref="loginRef"
      label-position="left"
    >
      <h3 class="title">{{ msg }}</h3>
      <el-form-item prop="username">
        <el-input
          name="username"
          type="text"
          maxlength="20"
          v-model.trim="loginForm.username"
          placeholder="账户名"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          name="password"
          maxlength="20"
          :type="passwordType"
          @keyup.enter="handleLogin"
          v-model="loginForm.password"
          placeholder="密码（随便填）"
        ></el-input>
        <span class="show-pwd" @click="togglePwdType">
          <el-icon><view /></el-icon>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          :loading="loginLoading"
          @click.prevent="handleLogin"
        >
          登录系统
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { showWarning } from '@/utils/element-plus'
import { useUserStore } from '@/store/modules/user'
import { useRules } from './hooks/useLogin'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

export default {
  name: 'login',
  setup() {
    const store = useUserStore()
    const { form, msg, passwordType, loginLoading } = storeToRefs(store)
    // form - 表单
    const loginForm = reactive({
      username: form.value.username,
      password: ''
    })
    const { rules } = useRules(form.value)
    const loginRules = reactive(rules)

    // methods
    const togglePwdType = function () {
      const type = passwordType.value === 'password' ? '' : 'password'
      store.TOGGLE_PWD_TYPE(type)
    }

    const loginRef = ref()
    const handleLogin = async function () {
      try {
        await loginRef.value.validate()
        const res = await store.postLogin(loginForm)
        console.log('login ==> success', res.data)
        const result = res.data.result
        if (result === '1') {
          router.push('/onload')
        } else {
          showWarning('请求异常，稍后重试')
        }
      } catch (error) {
        console.log('login ==> fail', error)
      }
    }

    return {
      loginRef,
      loginForm,
      loginRules,
      msg,
      passwordType,
      loginLoading,
      togglePwdType,
      handleLogin
    }
  }
}
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

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
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
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

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$bg_form: #333;
$bg_shadow: #545454;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 50%;
    top: 40%;
    width: 520px;
    padding: 35px 35px 15px 35px;
    transform: translate(-50%, -50%);
    background-color: $bg_form;
    border-radius: 10px;
    box-shadow: 0 0 10px $bg_shadow;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
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
    color: $light_gray;
    margin: 0px auto 50px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
