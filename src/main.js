import { createApp } from 'vue'
import App from './App.vue'
// router
import router from './router/index.js'
// store
import store from './store/index'
// less
// 全局的样式
import '@/styles/index.less'
// import '@/styles/icon.less'
// vant
import Vant from 'vant'
// vant的全局的样式
import 'vant/lib/index.css'
// rem移动端适配
import 'amfe-flexible'

// vue3x + vant3x
const app = createApp(App)
app.use(router)
app.use(store)
app.use(Vant)
  .mount('#app')
