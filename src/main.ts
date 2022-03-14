import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import installElementPlus from './plugins/element-plus'
import installElementIcons from './plugins/element-icons'

// dev: mock request pro: can remove
import './mock'
import './styles/index.js'

const app = createApp(App)

installElementIcons(app)
installElementPlus(app)

app.use(router).use(store).mount('#app')
