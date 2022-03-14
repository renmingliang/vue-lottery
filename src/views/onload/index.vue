<!-- onload -->
<template>
  <div class="load-container">
    <el-steps :active="activeStep" finish-status="success">
      <el-step title="数据获取中..." :description="`共计获取 ${userNum}条`"></el-step>
      <el-step title="存储数据中..." :description="`共计插入 ${cacheNum}条`"></el-step>
      <el-step title="缓存头像中..." :description="`共计缓存 ${catchImg}张`"></el-step>
      <el-step
        :title="`数据校验${step.title}`"
        :status="step.status"
        :description="step.description"
      ></el-step>
    </el-steps>
    <div v-if="stop.show" :class="classStop">
      <div class="stop-tips">{{ stop.tips }}</div>
      <div class="stop-mask"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOnloadStore } from '@/store/modules/onload'
import { useDB } from './hooks/useDB'
import { useOnload } from './hooks/useOnload'
export default {
  name: 'onload',
  setup() {
    const activeStep = ref(0) // 步骤流程
    const cacheNum = ref(0) // 存储数据长度

    const store = useOnloadStore()

    const { deleteDB, initDB } = useDB()

    const { data, step, stop, userNum, catchImg, classStop, preLoadImg, validateData } = useOnload({
      cacheNum
    })
    const router = useRouter()

    const ready = async function () {
      try {
        // 1.1.1获取数据
        await store.getDatas()
        userNum.value = (data.value?.userData || []).length
        activeStep.value = 1

        // 1.1.2.初始化创建本地indexDB数据表
        deleteDB()
        const [resAward, resUser] = await initDB()
        if (!resAward || !resUser) throw new Error('初始化database失败')
        cacheNum.value = resUser
        activeStep.value = 2

        // 1.1.3.缓存头像
        await preLoadImg()
        activeStep.value = 3

        // 1.1.4.校验数据
        await validateData()
        router.push({ path: '/lottery' })
      } catch (error) {
        // 1.1.5.捕获错误
        console.log('onload ==> error', error)
        step.title = '失败'
        step.status = 'error'
        step.description = '请重新进入或者 刷新本页面'
      }
    }

    onMounted(() => {
      ready()
    })

    return {
      activeStep,
      step,
      stop,
      userNum,
      cacheNum,
      catchImg,
      classStop
    }
  }
}
</script>

<style lang="scss" scoped>
.load-container {
  padding: 50px;
  font-size: 20px;
  .lottery-stop {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    transition: all 0.3s;
    &.show {
      display: block;
    }
    .stop-tips {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      text-align: center;
      font-size: 18rem;
      padding: 0 3rem;
      color: #fd361f;
      font-family: 'STKaiti', 'KaiTi ';
      border: 4px solid #fd361f;
      border-radius: 100%;
    }
    .stop-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
