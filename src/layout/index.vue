<template>
    <div class='layout-container'>
        <div class="layout-sidebar"></div>
        <div class="layout-tabbar"></div>
        <div class="layout-main"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref } from 'vue'
    
</script>

<style scoped lang="scss">
    .layout-container {
        
    }

    .layout-sidebar {
        width: variable.$layout-sidebar-width;
        height: 100vh;
        background: myColor.$myBlack;
    }

    .layout-main {
        width: calc(100% - variable.$layout-sidebar-width);
        height: 100vh;
        background: myColor.$myWhite;
    }
</style>