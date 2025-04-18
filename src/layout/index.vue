<template>
    <div class='layout-container'>
        <!-- element-plus自带滚动组件 -->
        <el-menu :collapse="settingStore.fold ? true : false" class="layout-sidebar" :class="{open: settingStore.fold ? false : true }" :default-active="route.path" background-color="#333" text-color="#fff" color="#fff">
            <!-- <img src="@/assets/images/mouse.gif" alt="logo"> -->
            <Logo />
            <el-scrollbar>
                <SideMenu :menuList="userStore.menuRoutes"/>
            </el-scrollbar>
        </el-menu>

        <div class="layout-topbar" :class="{open: settingStore.fold ? false : true }">
            <TopBar/>
        </div>

        <div class="layout-main" :class="{open: settingStore.fold ? false : true }">
            <!-- 封装main，运用动效 -->
            <Main/>
        </div>
    </div>
</template>

<script lang='ts' setup>
    import Logo from './Logo.vue'
    import SideMenu from './SideMenu.vue';
    import Main from './main/index.vue'
    import TopBar from './topbar/index.vue'
    import useUserStore from '@/store/modules/userStore.ts'
    import useSettingStore from '@/store/settingStore'
    import { useRoute } from 'vue-router'

    const userStore = useUserStore()
    const settingStore = useSettingStore()

    const route = useRoute()    // 获取路由url，保存菜单打开信息

</script>

<style scoped lang="scss">

* {
    user-select: none;
}

.layout-container {}

.layout-sidebar {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: variable.$layout-sidebar-fold-width;
    transition: width .3s;

    &.open {
        width: variable.$layout-sidebar-width;
    }
}

.layout-sidebar .logo {
    font-size: 20px;
    padding: 20px 15%;
}

.layout-main {
    position: absolute;
    right: 0;
    top: variable.$layout-topbar-height;
    overflow-x: hidden;
    padding: 20px;
    width: calc(100% - variable.$layout-sidebar-fold-width);
    height: 90vh;
    // background: variable.$layout-main-background;
    transition: width .3s;
    z-index: 100;
    background: #fff;

    &.open {
        width: calc(100% - variable.$layout-sidebar-width);
    }
}

.dark .layout-main{
    background: var(--el-color-black);
}

.layout-topbar {
    display: flex;
    align-items: center;
    gap: 2%;
    padding: 0 2%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    width: calc(100% - variable.$layout-sidebar-fold-width);
    height: variable.$layout-topbar-height;
    background: variable.$layout-topbar-background;
    box-shadow: 1px 2px 2px rgba(100, 100, 100, .1), 1px 2px 2px rgba(100, 100, 100, .2);
    transition: all .3s;

    &.open {
        width: calc(100% - variable.$layout-sidebar-width);
    }
}

.dark .layout-topbar{
    background: var(--el-color-black);
}

.block {
    display: flex;
    text-decoration: none;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
}

.sub-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    align-items: center;
    height: 0;
    overflow: hidden;
    transition: height 1s;

    .block {
        padding: 10px !important;
    }

    p {
        font-size: 18px;
    }
}

.sub-block:hover {
    background: #555;
}

.block.active {
    .sub-block {
        height: auto;
    }
}

.layout-sidebar .block {
    color: myColor.$myWhite;
    padding: 25px 10%;

    p {
        color: myColor.$myWhite;
    }
}

.layout-sidebar .block:hover {
    background: #555;
}</style>