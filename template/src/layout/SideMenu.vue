<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 无子路由 -->
        <template v-if="!item.meta.hidden">
            <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ $t(item.name) }}</span>
                </template>
            </el-menu-item>
            <!-- 至少一个子路由 -->
            <el-sub-menu class="sub-menu" v-else-if="item.children" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ $t(item.name) }}</span>
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
            path: vc.index
        })
    }

    defineProps(['menuList'])
    defineOptions({
        name: 'SideMenu'
    })
</script>

<style scoped lang="scss">
    span {
        font-size: 17px;
        color: myColor.$myWhite;
    }
</style>