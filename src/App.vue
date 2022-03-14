<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>
