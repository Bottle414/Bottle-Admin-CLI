<template> 
    <el-icon size="20" @click="changeIcon">
        <component :is="settingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item class="bread-item" v-for="item in route.matched" :to="{ path: item.path }" :key="item.name">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            {{ item.meta.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="topbar-right">
        <el-button title="刷新" :icon="Refresh" @click="refresh" circle></el-button>
        <el-button title="全屏" :icon="FullScreen" @click="fullscreen" circle></el-button>
        <el-popover
            class="box-item"
            title="设置"
            placement="bottom"
        >
            <template #reference>
                <el-button title="设置" :icon="Setting" circle></el-button>
            </template>
            <template #default>
                <div class="setting">
                    <span>自定义主题</span>
                    <el-switch v-model="customize" style="--el-switch-on-color: #13ce66;" />
                </div>
                <div class="setting">
                    <span>自定义主题色</span>
                    <el-color-picker @change="changeColor" :teleported="false" v-model="color" />
                </div>
                <div class="setting">
                    <div style="width: 100%; display: flex; justify-content: space-between;">
                        <span>夜间模式</span>
                        <el-switch @change="changeTheme" v-model="theme"/>
                    </div>
                    <el-checkbox v-model="defaultTheme">跟随系统</el-checkbox>
                </div>
            </template>
        </el-popover>
        
        <img :src="userStore.avatar" alt="head-icon">
        <el-dropdown>
            <span class="el-dropdown-link">
              {{ userStore.username }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
    </div>
</template>

<script lang='ts' setup>
    import useSettingStore from '@/store/settingStore.ts'
    import useUserStore from '@/store/modules/userStore.ts'
    import { useRoute } from 'vue-router'
    import router from '@/router'
    import { ArrowRight, Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    // let fold = ref(true) 为了方便组件通信，直接存入仓库
    const settingStore = useSettingStore()
    const userStore = useUserStore()
    const route = useRoute()
    let color = ref('#409EFF')
    let customize = ref(false)
    let theme = ref(false)
    let defaultTheme = ref(true)

    function changeIcon(){
        settingStore.fold = !settingStore.fold
    }

    function refresh(){ // 刷新事件回调
        settingStore.refresh = !settingStore.refresh
    }

    function fullscreen(){// 全屏事件回调 其实f11就可以 但f11的全屏检测不到
        // console.log(document.fullscreenElement); 查看是否全屏
        let isfull = document.fullscreenElement
        if (!isfull) {
            document.documentElement.requestFullscreen()    // 请求全屏
        }else {
            document.exitFullscreen()
        }
    }

    function logout() {
        userStore.logout()
        router.push({
            path: '/login',
            query: { redirect: route.path } // 再次登陆时返回上次退出的页面
        })
    }

    function changeTheme(){
        // 给html添加dark标签
        const html = document.documentElement
        theme.value ? html.className = 'dark' : html.className = ''
    }

    function changeColor(){
        const html = document.documentElement
        html.style.setProperty('--el-color-primary', color.value)
    }
</script>

<style scoped>
    .topbar-right {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;

        img {
            width: 50px;
            height: 50px;
            margin: 0 20px;
            border-radius: 25px;
            border: 1px solid #dcdfe6;
        }
    }

    .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .el-dropdown-link:focus-visible {
        outline: none;
    }

    .box-item {
        width: 110px;
        margin-top: 10px;
        display: flex;
    }

    .setting {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding-top: 5px;
    }
</style>