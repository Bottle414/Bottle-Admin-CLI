<template>
    <div class='screen' ref="screen">
        <div class="main">
            <div class="left">
                <Tourist/>
                <Sex/>
                <Age/>
            </div>
            <div class="center">
                <div class="top">
                    <Map/>
                </div>
                <div class="bottom"></div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script lang='ts' setup>
    import Sex from './components/Sex.vue'
    import Age from './components/Age.vue'
    import Tourist from './components/Tourist.vue'
    import Map from './components/Map.vue'
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
        height: 100%;
    }

    .center {
        flex: 2;
        display: flex;
        justify-content: center;
        text-align: center;
        height: 100vh;

        .top {
            width: 100%;
            height: 60%;
        }
    }

    .left, .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>