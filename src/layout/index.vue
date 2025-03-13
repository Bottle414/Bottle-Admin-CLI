<template>
    <div class='layout-container'>
        <!-- element-plus自带滚动组件 -->
        <el-menu class="layout-sidebar" background-color="#333" text-color="#fff" color="#fff">
            <!-- <img src="@/assets/images/mouse.gif" alt="logo"> -->
            <Logo />
            <el-scrollbar>
                <SideMenu :menuList="menuList"/>
            </el-scrollbar>
        </el-menu>

        <div class="layout-topbar">
            <Icon icon="ion" name="menu"></Icon>
            <div class="block">
                <Icon icon="ion" name="home"></Icon>
                <p>首页</p>
            </div>
        </div>

        <div class="layout-main">
        </div>
    </div>
</template>

<script lang='ts' setup>
import Logo from './Logo.vue'
import SideMenu from './SideMenu.vue';
import useUserStore from '@/store/modules/userStore.ts'

const userStore = useUserStore()
const menuList = userStore.menuRoutes.filter(route => route.meta?.title)
</script>

<style scoped lang="scss">
* {
    user-select: none;
}

.layout-container {}

.layout-sidebar {
    display: flex;
    min-width: 180px;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: variable.$layout-sidebar-width;
    height: 100vh;
}

.layout-sidebar .logo {
    font-size: 20px;
    padding: 20px 15%;
}

.layout-main {
    position: absolute;
    right: 0;
    width: calc(100% - variable.$layout-sidebar-width);
    height: 100vh;
    background: variable.$layout-main-background;
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
    width: calc(100% - variable.$layout-sidebar-width);
    height: variable.$layout-topbar-height;
    background: variable.$layout-topbar-background;
    box-shadow: 1px 2px 2px rgba(100, 100, 100, .1), 1px 2px 2px rgba(100, 100, 100, .2);
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