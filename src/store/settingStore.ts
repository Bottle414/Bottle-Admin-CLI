import { defineStore } from 'pinia' // 记录组件状态的仓库

const useSettingStore = defineStore('setting',{
    state() {
        return {// store 的 state 默认情况下是 ref 类型的。当你在创建 store 时，Pinia 会自动将 state 转换为 ref，这样你可以像响应式数据一样操作它。
            fold: false,
            refresh: false  // 控制二级界面刷新
        }
    },
    getters: {

    },
    actions: {

    }
})

export default useSettingStore