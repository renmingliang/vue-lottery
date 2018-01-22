import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state'
import login from './modules/login'
import onload from './modules/onload'
import lottery from './modules/lottery'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  modules: {
    login,
    onload,
    lottery
  },
  strict: debug, // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  plugins: debug ? [createLogger()] : [] // logger 插件会生成状态快照，所以仅在开发环境使用。如果正在使用 vue-devtools，你可能不需要此插件。
})
