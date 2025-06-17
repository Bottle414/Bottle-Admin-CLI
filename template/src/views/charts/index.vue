<template>
    <div class="screen" ref="screen">
        <Map :option="mapOption"/>
        <Line :option="lineOption"/>
        <Pie :option="pieOption"/>
    </div>
</template>

<script lang="ts" setup>
    import Map from '@/components/charts/Map.vue'
    import { mapOption } from '@/schemas/charts/map'
    import Line from '@/components/charts/Line.vue'
    import { lineOption } from '@/schemas/charts/line'
    import Pie from '@/components/charts/Pie.vue'
    import { pieOption } from '@/schemas/charts/pie'

    // 获取dom
    // const screen = ref()

    // onMounted(() => {
    //     screen.value.style.transform = `scale(${ getScale() }) translate(-50%, -50%)`
    // })

    // function getScale(w = 1920, h = 1980){
    //     const ww = window.innerWidth / w
    //     const wh = window.innerHeight / h
    //     return ww < wh ? ww : wh
    // }

    // window.onresize = () => {
    //     screen.value.style.transform = `scale(${ getScale() }) translate(-50%, -50%)`
    // }
</script>

<style scoped lang="scss">
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        aspect-ratio: 1.8;
    }

    .main {
        display: flex;
        width: 100%;
    }

    .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        height: 100vh;

        .top {
            width: 100%;
            height: 60%;
        }

        .bottom {
            width: 100%;
            height: 40%;
        }
    }

    .left,
    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
