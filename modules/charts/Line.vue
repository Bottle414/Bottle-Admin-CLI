<template>
    <div class='comparison'>
        <h2>年度对比</h2>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted } from 'vue'
    import * as echarts from 'echarts'

    const root = ref()

    defineProps(['option', 'title'])

    onMounted(() => {
        const comparisionBar = echarts.init(root.value)
        comparisionBar.setOption(option)
    })
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .comparison {
        padding: 0 2%;
        width: 100%;
        height: 100%;
    }

    .root {
        width: 100%;
        height: 90%;
    }
</style>