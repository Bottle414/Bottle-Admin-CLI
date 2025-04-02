<template>
    <div class='channel'>
        <h2>购买平台统计</h2>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted } from 'vue'
    import * as echarts from 'echarts'
    const root = ref()

    onMounted(() => {
        const channel = echarts.init(root.value)

        channel.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: '网络平台' },
                        { value: 735, name: '线下店铺' },
                        { value: 580, name: '第三方软件' },
                        { value: 249, name: '电视' },
                        { value: 530, name: '其他' }
                    ]
                }
            ]
        })
    })
    
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .channel {
        padding: 0 2%;
        width: 100%;
        height: 100%;
    }
    .root {
        width: 100%;
        height: 90%;
    }
</style>