import { createApp } from 'vue'
import App from './App.vue'
import AllComponents from './components'/* 全局组件 */

const app = createApp(App)
app.use(AllComponents)
app.mount('#app')