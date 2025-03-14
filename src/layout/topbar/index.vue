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
        <el-button :icon="Refresh" @click="refresh" circle></el-button>
        <el-button :icon="FullScreen" circle></el-button>
        <el-button :icon="Setting" circle></el-button>
        <img src="/public/mouse.gif" alt="head-icon">
        <el-dropdown>
            <span class="el-dropdown-link">
              Admin
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
    import { useRoute } from 'vue-router'
    import { ArrowRight, Expand, Fold, Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
    // let fold = ref(true) 为了方便组件通信，直接存入仓库
    const settingStore = useSettingStore()
    const route = useRoute()

    function changeIcon(){
        settingStore.fold = !settingStore.fold
    }

    function refresh(){ // 刷新事件回调
        settingStore.refresh = !settingStore.refresh
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