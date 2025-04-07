<template>
    <div class='future'>
        <h1>未来趋势</h1>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import * as echarts from 'echarts'
    import useChartResize from '@/utils/chartsResize'
    const root = ref()

    let removeResizeListener: () => void
    let fakeData = [820, 932, 901, 934, 1290, 1330, 1320]// TODO: 改成真实数据

    onMounted(() => {
        const futureLine = echarts.init(root.value)
        futureLine.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: fakeData,
                type: 'line',
                smooth: true
                }
            ]
        })

        removeResizeListener = useChartResize(futureLine)
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
    .future {
        width: 100%;
        height: 100%;
    }

    .root {
        width: 100%;
        height: 100%;
    }
</style>