<template>
    <div class='popular'>
        <h2>销量排行</h2>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import * as echarts from 'echarts'
    import useChartResize from '@/utils/chartsResize'
    const root = ref()
    let removeResizeListener = () => {} // 默认为空函数

    const data = <any>[]
    for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200))
    }

    onMounted(() => {
        const activeRanks = echarts.init(root.value)
        activeRanks.setOption({
            xAxis: {
                max: 'dataMax'
            },
            yAxis: {
                type: 'category',
                data: ['A', 'B', 'C', 'D', 'E'],
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                max: 2 // only the largest 3 bars will be displayed
            },
            series: [{
                    realtimeSort: true,
                    name: 'X',
                    type: 'bar',
                    data: data,
                    barWidth: 20,
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    }
                }],
            legend: {
                show: true
            },
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            animationDuration: 0,
            animationDurationUpdate: 3000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        })

        removeResizeListener = useChartResize(activeRanks)
    })
    setTimeout(() => {
        run()
    }, 0)
    setInterval(() => {
        run()
    }, 3000)

    function run() {
        for (var i = 0; i < data.length; ++i) {
            if (Math.random() > 0.9) {
                data[i] += Math.round(Math.random() * 2000);
            } else {
                data[i] += Math.round(Math.random() * 200);
            }
        }
    }

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

    .popular {
        padding: 0 2%;
        width: 100%;
        height: 100%;
    }

    .root {
        width: 100%;
        height: 80%;
    }
</style>