<template>
    <div class="map">
        <h1>合作商分布</h1>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import * as echarts from 'echarts'
    import chinaData from './map.json'

    const root = ref()

    echarts.registerMap('china', chinaData as any)

    defineProps(['option', 'title'])

    onMounted(() => {
        const map = echarts.init(root.value)
        map.setOption(option)
    })
</script>

<style scoped>
    .map {
        padding: 0 2%;
        width: 100%;
        height: 100%;
    }

    .root {
        width: 100%;
        height: 90%;
        border: 1px solid #eee;
        box-shadow: 1px 1px 1px rgba(100, 100, 100, 0.2),
            1px 2px 2px rgba(100, 100, 100, 0.1);
    }
</style>
