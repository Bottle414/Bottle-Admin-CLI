<template>
    <div id="logo">
        <img :src="logoConfig.image" alt="logo-image">
        <p id="title" v-if="!settingStore.fold">{{ logoConfig.title }}</p>
    </div>
</template>

<script lang='ts' setup>
    import { logoConfig } from '@/schemas/logo'
    import useSettingStore from '@/store/settingStore.ts'
    const settingStore = useSettingStore()
</script>

<style scoped lang="scss">
    #logo {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
        transition: .5s;

        img {
            height: 40px;
        }
        #title {
            flex: 2fr;
            color: $myWhite;
        }
    }
</style>