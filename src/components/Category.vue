<template>
    <!-- 三级联动 -->
    <el-card>
        <e-form class="select-form">
            <el-form-item style="width: 30%; min-width: 200px;" label="一级分类">
                <el-select>
                    <el-option label="x"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 30%; min-width: 200px;" label="二级分类">
                <el-select>
                    <el-option></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 30%; min-width: 200px;" label="三级分类">
                <el-select>
                    <el-option></el-option>
                </el-select>
            </el-form-item>
        </e-form>
    </el-card>
</template>

<script lang="ts">
    import request from '@/utils/request'
    import { ref, onMounted } from 'vue'
    // 要在一级分类选中以后才能选择二级分类
    let c1Arr = ref<any>([
        {
            name: '1'
        },
        {
            name: '2'
        }
    ])
    let c2 = ref([])
    let c3 = ref([])
    onMounted(() => {
        // 一来就发请求
        getC1()
    })

    async function getC1(){
        const c1 = await request.get('')// 获取分类1的地址
        if (c1.status == 200){
            // 获取成功，赋值
            c1Arr.value = c1.data
        }
    }
    function getC2(){

    }
</script>

<style scoped>
    .select-form {
        display: flex;
        justify-content:space-between;
        transform: translateY(20%);
    }
</style>