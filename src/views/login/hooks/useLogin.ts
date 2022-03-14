export const useRules = function (form) {
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

  const rules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  }

  return {
    rules
  }
}
