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
    let refreshing = ref(false)

    watch(() => settingStore.refresh, () => {
        refreshing.value = true
        nextTick(() => {
            refreshing.value = false
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