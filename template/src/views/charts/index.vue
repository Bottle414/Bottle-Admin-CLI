<template>
    <div class="screen" ref="screen">
        <Tourist />
        <Sex />
        <Age />
        <Map />
        <Future />
        <Popular />
        <Comparison />
        <Channel />
    </div>
</template>

<script lang="ts" setup>
    import Sex from '@/components/charts/Sex.vue'
    import Age from '@/components/charts/Age.vue'
    import Tourist from '@/components/charts/Tourist.vue'
    import Map from '@/components/charts/Map.vue'
    import Future from '@/components/charts/Future.vue'
    import Popular from '@/components/charts/Popular.vue'
    import Comparison from '@/components/charts/Comparison.vue'
    import Channel from '@/components/charts/Channel.vue'
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
