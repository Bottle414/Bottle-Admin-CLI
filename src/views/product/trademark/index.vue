<template>
    <el-card style="max-width: 100%" shadow="hover">
        <el-button type="primary" icon="Plus">添加品牌</el-button>
        <el-table :data="products" border style="margin:10px 0; width: 100%">
            <el-table-column prop="index" label="序号" width="100%" align="center"/>
            <el-table-column prop="name" label="品牌名称" align="center"/>
            <el-table-column prop="logo" label="品牌logo" align="center">
                <template #default="{ row }">
                    <img :src="row.logo" alt="品牌logo" style="width: 50px; height: 50px; object-fit: cover;">
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="品牌操作">
                <template #default>
                    <el-button title="修改" type="primary" icon="EditPen" @click="editItem"></el-button>
                    <el-button title="删除" icon="Delete" color="#f8ae0d" @click="deleteItem"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            style="margin-top: 20px"
            size="default"
            :disabled="false"
            :background="false"
            layout="prev, pager, next, -> ,jumper, total"
            :total="20"
            @click="reqProducts"
        />
    </el-card>
</template>

<script lang='ts' setup>
    import { ref, onMounted } from 'vue'
    import { getProducts } from '@/api/product/product.ts'
    // 写了ts类型，但是没加

    let currentPage = ref<number>(1)
    let pageSize = ref(3)// 每页数据条数
    let products = ref('')

    onMounted(() => {// 一进来就有一次请求
        reqProducts()
    })

    async function reqProducts(){
        const response = await getProducts(currentPage.value, pageSize.value)
        products.value = response.data
    }

    function editItem(){
        
    }

    function deleteItem(){

    }
</script>

<style scoped>
    
</style>