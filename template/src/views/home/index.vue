<template>
    <el-card>
        <div class="card">
            <img class="headImage" :src="userStore.avatar" alt="user-headImage">
            <div class="welcomeText">
                <h2>{{ $t('hi') }} {{ userStore.username }} {{ lang == 'zh' ? getTimeTextZh() : getTimeText() }} </h2>
                <h3 class="title">{{ $t('title') }}</h3>
            </div>
        </div>
    </el-card>
</template>

<script lang='ts' setup>
    import useUserStore from '@/store/modules/userStore'
    import { getTimeTextZh, getTimeText } from '@/utils/time'
    import router from '@/router'
    const userStore = useUserStore()
    const lang = localStorage.getItem('lang')

    if (!userStore.token){
        router.replace({
            path: ('/login')
        })
    }
</script>

<style scoped>
    .card {
        display: flex;
        align-items: center;
        gap: 10%;
    }
    .headImage {
        width: 15%;
        aspect-ratio: 1 / 1;
        border: 1px solid #bbb;
        border-radius: 100%;
    }

    .title {
        color: #bbb;
        padding-top: 10px;
    }
</style>