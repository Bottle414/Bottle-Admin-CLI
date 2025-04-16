<template>
    <div class='age'>
        <h2>年龄展示</h2>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import * as echarts from 'echarts'
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import useChartResize from '@/utils/chartsResize'

    const root = ref()
    let agePie: any = {}
    let removeResizeListener = () => {} // 默认为空函数

    onMounted(() => {
        agePie = echarts.init(root.value)
    
        agePie.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'horizontal',
                left: 'top'
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 100, name: '儿童' },
                        { value: 735, name: '青年' },
                        { value: 580, name: '壮年' },
                        { value: 484, name: '老年' },
                    ],
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ],
            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }
        })
         // 注册 resize 监听器
        removeResizeListener = useChartResize(agePie)
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
    .age {
        width: 100%;
        height: 100%;
    }

    .root {
        width: 100%;
        height: 300px;
    }
</style>