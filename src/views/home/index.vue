<template>
    <h1>Home</h1>
</template>

<script lang='ts' setup>
    import useUserStore from '@/store/modules/userStore'
    import { onMounted } from 'vue';
    const userStore = useUserStore()

    onMounted(() => {
        userStore.getUserInfo() // 一进来就获取用户信息
    })
</script>

<style scoped>
    
</style>