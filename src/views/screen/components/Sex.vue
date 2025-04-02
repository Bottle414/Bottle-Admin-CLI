<template>
    <div class='sex'>
        <h2>性别比例</h2>
        <div class="icon">
            <el-icon color="pink" size="1.5em"><Female/></el-icon>
            <el-icon color="blue" size="1.5em"><Male/></el-icon>
        </div>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang='ts' setup>
    import * as echarts from 'echarts'
    import { ref, onMounted } from 'vue'
    let root = ref()

    onMounted(() => {
        // 初始化echarts
        let sexbar = echarts.init(root.value)
        // 配置echarts
        sexbar.setOption({
            title: {
                textStyle: {
                    color: 'pink'
                },
                left: 0
            },
            xAxis:{// 必须配置x和y
                show: false,
                min: 0,
                max: 100,
                type: 'value'
                // type: 'category',
                // data:[1]
            },
            yAxis: {
                show: false,
                type: 'category',// 横着排列了
                // type: 'value'
            },
            series:[
                {
                    type: 'bar',
                    data: [40],
                    barWidth: 16,
                    barGap: '-100%',
                    roundCap: true,
                    itemStyle: {
                        color: 'pink',
                        borderRadius: [8, 8, 8, 8] // 圆角
                    }
                },
                {
                    type: 'bar',
                    data: [100],
                    barWidth: 16,
                    roundCap: true,
                    itemStyle: {
                        color: 'blue',
                        borderRadius: [8, 8, 8, 8] // 圆角
                    },
                    z: -1
                }
            ],
            grid: {
                left: 0,
                top: -25,
                bottom: 0,
                right: 0
            }
        })
    })
    // TODO: 可以考虑到将公共部分抽离到sass
</script>

<style scoped lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
   .sex {
        padding: 0 2%;
        width: 100%;
        height: 100%;
    }

    .root {
        width: 100%;
        height: 100%;
    }

    .icon {
        display: flex;
        justify-content: space-between;
    }
</style>