<template>
    <iconify-icon :icon="`${icon}:${name}`" :style="style"></iconify-icon>
    <!-- style会覆盖:font-size之类的属性 -->
</template>

<script lang='ts' setup>
defineProps({
    icon: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    style: {
        type: String,
        default: 'font-size: 30px; color: #333;'
    }
})

</script>