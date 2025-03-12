<template>
    <div class='layout-container'>
        <div class="layout-sidebar">
            <!-- <img src="@/assets/images/mouse.gif" alt="logo"> -->
            <Logo/>
            <router-link :to="{ path: '/home'}" class="block">
                <Icon icon="ion" name="home" style="color: #fff; font-size: 20px"></Icon>
                <p>首页</p>
            </router-link>
            <router-link :to="{ path: '/data'}" :class="authOpen ? ['block', 'active'] : 'block'">
                <Icon icon="ion" name="tv" style="color: #fff; font-size: 20px"></Icon>
                <p>数据大屏</p>
            </router-link>
            <div @click="authClick" class="block">
                <Icon icon="ion" name="lock-closed" style="color: #fff; font-size: 20px"></Icon>
                <p>权限管理</p>
                <Icon icon="ion" :name="authOpen ? 'chevron-up' : 'chevron-down'" style="color: #fff; font-size: 20px"></Icon>
                <div class="sub-block">

                </div>
            </div>
            <div  @click="dataClick" :class="dataOpen ? ['block', 'active'] : 'block'">
                <Icon icon="ion" name="bag-handle" style="color: #fff; font-size: 20px"></Icon>
                <p>商品管理</p>
                <Icon icon="ion" :name="dataOpen ? 'chevron-up' : 'chevron-down'" style="color: #fff; font-size: 20px"></Icon>
                <div class="sub-block">
                    <div class="block">
                        <Icon icon="ion" name="cart" style="color: #fff; font-size: 20px"></Icon>
                        <p>品牌管理</p>
                    </div>
                    <div class="block">
                        <Icon icon="ion" name="person" style="color: #fff; font-size: 20px"></Icon>
                        <p>属性管理</p>
                    </div>
                    <div class="block">
                        <Icon icon="ion" name="clipboard" style="color: #fff; font-size: 20px"></Icon>
                        <p>SPU管理</p>
                    </div>
                    <div class="block">
                        <Icon icon="ion" name="clipboard" style="color: #fff; font-size: 20px"></Icon>
                        <p>SKU管理</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="layout-topbar">
            <Icon icon="ion" name="menu"></Icon>
            <div class="block">
                <Icon icon="ion" name="home"></Icon>
                <p>首页</p>
            </div>
        </div>

        <div class="layout-main"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref } from 'vue'
    import Logo from './Logo.vue'
    let authOpen = ref(false)
    let dataOpen = ref(false)

    function authClick(){
        authOpen.value = !authOpen.value
    }

    function dataClick(){
        dataOpen.value = !dataOpen.value
    }
</script>

<style scoped lang="scss">
    * {
        user-select: none;
    }
    .layout-container {
        
    }

    .layout-sidebar {
        display: flex;
        min-width: 180px;
        flex-direction: column;
        position: fixed;
        left: 0;
        top: 0;
        width: variable.$layout-sidebar-width;
        height: 100vh;
        background: myColor.$myBlack;
        color: myColor.$myWhite;
    }

    .layout-sidebar .logo {
        font-size: 20px;
        padding: 20px 15%;
    }

    .layout-main {
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
    }
</style>