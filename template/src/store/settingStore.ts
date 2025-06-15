import { defineStore } from 'pinia' // 记录组件状态的仓库

const useSettingStore = defineStore('setting',{
    state() {
        return {
            fold: false,    // 侧边栏展开
            refresh: false,  // 控制二级界面刷新
        }
    },
    getters: {

    },
    actions: {

    }
})

export default useSettingStore