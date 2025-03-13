<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
</template>

<script lang='ts' setup>
    import { ref } from 'vue'
    
</script>

<style scoped>
    .fade-enter-from {
        opacity: 0;
        transform: translateX(100%);
    }

    .fade-enter-active {
        transition: opacity 1s,transform .5s;
    }

    .fade-enter-to {
        opacity: 1;
        transform: translateX(0);
    }
</style>