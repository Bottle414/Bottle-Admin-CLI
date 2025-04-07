<template>
    <router-view v-slot="{ Component }" :key="$route.path">
        <transition name="fade">
          <component v-if="!refreshing" :is="Component" />
        </transition>
      </router-view>
</template>

<script lang='ts' setup>
    import useSettingStore from '@/store/settingStore.ts'
    import { watch, ref, nextTick } from 'vue';
    
    const settingStore = useSettingStore()
    let refreshing = ref(false) // 组件正在更新

    watch(() => settingStore.refresh, () => {
        refreshing.value = true
        nextTick(() => {
            refreshing.value = false    // 更新完毕 获取更新后的DOM的Vue方法。所以放在Vue.nextTick()回调函数中的执行的应该是会对DOM进行操作的 js代码
        })
    })

    
</script>

<style scoped>
    .fade-enter-from {
        opacity: 0;
        transform: translateX(100%);
    }

    .fade-enter-active {
        transition: opacity 1s,transform .5s;
    }

    .fade-enter-to {
        opacity: 1;
        transform: translateX(0);
    }
</style>