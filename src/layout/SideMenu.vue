<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 无子路由 -->
        <template v-if="!item.meta.hidden"> <!-- 不要用v-show，会先渲染，影响性能 -->
            <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <!-- 至少一个子路由 -->
            <el-sub-menu class="sub-menu" v-else-if="item.children" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <SideMenu :menuList="item.children"/>
            </el-sub-menu>
        </template>
    </template>
</template>

<script lang='ts' setup>
    import router from '@/router'

    function goRoute(vc : any){
        router.push({
            path: vc.index  // 以path作为唯一标识符使得这里以index可以跳转路由
        })
    }

    defineProps(['menuList']) // 获取layout传来的菜单项
    defineOptions({
        name: 'SideMenu'
    })  // 给组件起名
</script>

<style scoped lang="scss">
    span {
        font-size: 17px;
        color: myColor.$myWhite;
    }
</style>