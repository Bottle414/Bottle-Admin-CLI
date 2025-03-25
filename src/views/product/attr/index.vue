<template>
    <div class="sttr">
        <Category/>

        <el-card style="margin-top: 20px;">
            <el-button type="primary" icon="Plus">添加属性</el-button>
            <el-table :data="attrs" border>
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

    
</script>

<style scoped>
    
</style>