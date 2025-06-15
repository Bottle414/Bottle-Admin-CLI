<template>
    <div class='map'>
        <h1>合作商分布</h1>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import * as echarts from 'echarts'
    import chinaData from './map.json'
    import useChartResize from '@/utils/chartsResize'
    const root = ref()
    let removeResizeListener = () => {} // 默认为空函数

    echarts.registerMap('china', chinaData as any)

    onMounted(() => {
        const map = echarts.init(root.value)
        map.setOption({
            geo: {
                map: 'china',
                roam: true
            },
            series:[
                {
                    type: 'lines',
                    data: [
                        {
                            coords: [
                                [112, 40],
                                [109, 30]
                            ],
                            lineStyle: {
                                color: 'orange',
                                width: 1
                            },
                            effect: {
                                show: true,
                                symbol: 'rect'
                            }
                        }
                    ]
                }
            ],
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        })
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
    .map {
        padding: 0 2%;
        width: 100%;
        height: 100%;
    }

    .root {
        width: 100%;
        height: 90%;
        border: 1px solid #eee;
        box-shadow: 1px 1px 1px rgba(100, 100, 100, .2), 1px 2px 2px rgba(100, 100, 100, .1);
    }
</style>