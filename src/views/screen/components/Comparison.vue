<template>
    <div class='comparison'>
        <h2>年度对比</h2>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import * as echarts from 'echarts'
    import useChartResize from '@/utils/chartsResize'
    const root = ref()
    let removeResizeListener = () => {} // 默认为空函数

    onMounted(() => {
        const comparisionBar = echarts.init(root.value)
        comparisionBar.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['第一季度', '第二季度', '第三季度', '第四季度']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '2022',
                    type: 'line',
                    stack: 'Total',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '2023',
                    type: 'line',
                    stack: 'Total',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '2024',
                    type: 'line',
                    stack: 'Total',
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        })

        removeResizeListener = useChartResize(comparisionBar)
    })

    onBeforeUnmount(() => {
        removeResizeListener()
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