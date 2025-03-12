<template>
    <div id="logo">
        <img :src="logoConfig.image" :alt="logoConfig.image">
        <p>{{ logoConfig.title }}</p>
    </div>
</template>

<script lang='ts' setup>
    import { logoConfig } from '@/setting'
</script>

<style scoped lang="scss">
    #logo {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;

        img {
            width: 30%;
        }
        p {
            flex: 2fr;
            color: myColor.$myWhite;
        }
    }
</style>