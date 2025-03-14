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
        <el-button title="设置" :icon="Setting" circle></el-button>
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
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
    </div>
</template>

<script lang='ts' setup>
    import useSettingStore from '@/store/settingStore.ts'
    import useUserStore from '@/store/modules/userStore.ts'
    import { useRoute } from 'vue-router'
    import { ArrowRight, Expand, Fold, Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
    // let fold = ref(true) 为了方便组件通信，直接存入仓库
    const settingStore = useSettingStore()
    const userStore = useUserStore()
    const route = useRoute()

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
</style>