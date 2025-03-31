<template>
    <div class='tourist'>
        <h2>游客总量</h2>
        <p>200人</p>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted } from 'vue'
    import * as echarts from 'echarts'
    import 'echarts-liquidfill'
    const root = ref()// echart展示的DOM结点
    onMounted(() => {
        const ballChart = echarts.init(root.value)// 获取echart实例
        // 配置echart实例
        ballChart.setOption({
            // title: {// 标题
            //     text: '水球图'
            // },
            series: [{// 种类
                type: 'liquidFill',
                data: [0.6]
            }],
            grid:{// 布局
                left: 0,
                top: 0
            }
        })
    })
</script>

<style scoped>
    .tourist {
        width: 100%;
        height: 100%;
    }
    .root {
        width: 70%;
        height: 300px;
    }
</style>