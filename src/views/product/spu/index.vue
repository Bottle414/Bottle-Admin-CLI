<template>
    <div class="spu">
        <Category/>

        <el-card style="margin-top: 20px;">
            <el-button type="primary" icon="Plus">添加属性</el-button>
            <el-table :data="spus" border>
                <el-table-column prop="index" width="100%" type="index" align="center" label="序号"></el-table-column>
                <el-table-column prop="name" width="150%" label="属性名"></el-table-column>
                <el-table-column prop="value" min-width="300px" label="属性值"></el-table-column>
                <el-table-column width="200%" label="操作">
                    <template #default="{ row }">
                        <el-button title="修改" type="primary" icon="EditPen" @click=""></el-button>
                        <el-button title="删除" icon="Delete" color="#f8ae0d" @click=""></el-button>
                        <el-button title="查看详情" icon="Delete" color="#ddd" @click=""></el-button>
                        <el-button title="删除" icon="Delete" color="#f8ae0d" @click=""></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang='ts' setup>
    
    import { ref, onMounted } from 'vue'
    import { ElMessage } from 'element-plus';
    let spus = ref('')
    onMounted(() => {
        reqSPU()
    })

    async function reqSPU(){
        try {
            // const res = await getSPU()
            // spus.value = res.data
        } catch (error) {
            ElMessage({
                message: '获取spu数据失败'
            })
        }
    }
</script>

<style scoped>
    
</style>