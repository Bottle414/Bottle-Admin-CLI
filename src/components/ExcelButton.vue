<template>
    <el-button icon="Upload" type="success" @click="exportExcel(data,  logoConfig.title + sheetType + '.xlsx')">{{ $t('exportExcel') }}</el-button>
</template>

<script lang='ts' setup>
    import exportExcel from '@/utils/excel'
    import { logoConfig } from '@/setting'
    
    defineProps(['data', 'sheetType'])
</script>

<style scoped>
</style>