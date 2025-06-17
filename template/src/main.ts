import { createApp } from 'vue'
import App from './App.vue'
import AllComponents from './components' // 全局组件
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式
import '@/style/index.scss' // 样式文件
import '@/router/guard' // 全局守卫
// ~imports~

const app = createApp(App)
app.use(AllComponents)
// ~plugins~

app.mount('#app')
