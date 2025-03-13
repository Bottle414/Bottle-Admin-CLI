<template>
    <el-button :icon="Expand" style="border:none;">
    </el-button>
    
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang='ts' setup>
    import { ArrowRight, Expand } from '@element-plus/icons-vue'
</script>

<style scoped>
    
</style>