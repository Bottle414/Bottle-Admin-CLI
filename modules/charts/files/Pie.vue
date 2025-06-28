<template>
    <div class="pie">
        <h2>饼图</h2>
        <div class="root" ref="root"></div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import * as echarts from 'echarts'

    const root = ref()

    const props = defineProps(['option', 'title'])

    onMounted(() => {
        const pie = echarts.init(root.value)
        pie.setOption(props.option)
    })
</script>

<style scoped>
    .pie {
        padding: 0 2%;
        width: 100%;
        height: 100%;
    }
    .root {
        width: 100%;
        height: 90%;
    }
</style>
