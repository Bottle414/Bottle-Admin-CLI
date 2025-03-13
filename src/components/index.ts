import type { App } from 'vue'
import Icon from './Icon.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const allComponents = { Icon }

const install = (app: App) => {
    // Object.keys(allComponents).forEach(key => {
    //     app.component(key, allComponents[key as keyof typeof allComponents])
    // }) keys返回string[], ts不知道是allComponents里面的有效键，所以报错了 allComponents 的键是 { Icon: DefineComponent } typeof allComponents 获取 allComponents 的类型 keyof typeof allComponents 获取对象的 键的类型 allComponents[key as keyof typeof allComponents] 告诉 TypeScript： “放心，key 一定是 allComponents 的键，别再报错了！”
    Object.entries(allComponents).forEach(([key, component]) => {// 使用entries返回[key, value]阻止报错
        app.component(key, component)
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }  
}

export default install