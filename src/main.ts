import { createApp } from 'vue'
import App from './App.vue'
import AllComponents from './components'
import '@/style/index.scss'
import router from './router'
import pinia from './store'
import 'element-plus/dist/index.css'    // msg不显示，因为还要导入css
// import "element-plus/theme-chalk/el-message-box.css";
// import "element-plus/theme-chalk/el-message.css";
import '@/router/permission.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'// 暗黑模式
import i18n from './i18n'// 国际化

if ('serviceWorker' in navigator) {// 注册service worker
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope)
    }).catch((error) => {
      console.log('Service Worker registration failed:', error)
    })
}  

const app = createApp(App)
//install(app) // 注册我的全局组件 默认导出随便起个名字就行
app.use(AllComponents) // 调用 app.use() 时，Vue 会自动寻找你传入对象（或者说是插件）上的 install 方法并执行它。
app.use(router)// 注册路由
app.use(pinia) // 使用仓库
app.use(i18n)// 使用i18n
app.mount('#app')
