import type { App } from 'vue'
import Sample from './Sample.vue'

const allComponents = { Sample }

/* 全局注册组件 */
const install = (app: App) => {
    Object.entries(allComponents).forEach(([key, component]) => {
        app.component(key, component)
    })
}

export default install