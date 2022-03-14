import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'

export const useMusic = function () {
  const appStore = useAppStore()
  const { state: appState } = storeToRefs(appStore)

  const musicRef = ref()
  const musicState = ref(true) // 音乐播放状态
  const music = computed(() => appState.value.music)

  // 利用计算属性绑定class
  const classMusic = computed(() => {
    return {
      'lottery-music': true,
      stoped: musicState.value && music.value.show
    }
  })

  // 切换音乐播放状态
  const toggleMusic = function () {
    musicState.value = !musicState.value
    if (music.value.show) {
      if (musicState.value) {
        musicRef.value && musicRef.value.pause()
      } else {
        musicRef.value && musicRef.value.play()
      }
    }
  }

  onMounted(() => {
    toggleMusic()
  })

  return {
    music,
    musicRef,
    musicState,
    toggleMusic,
    classMusic
  }
}
