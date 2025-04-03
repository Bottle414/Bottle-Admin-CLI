<template>
    <el-button icon="Upload" type="success" @click="exportExcel(data,  logoConfig.title + sheetType + '.xlsx')">导出Excel</el-button>
</template>

<script lang='ts' setup>
    import exportExcel from '@/utils/excel'
    import { logoConfig } from '@/setting'
    
    defineProps(['data', 'sheetType'])
</script>

<style scoped>
</style>