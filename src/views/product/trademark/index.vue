<template>
    <el-card style="max-width: 100%" shadow="hover">
        <el-button type="primary" icon="Plus" @click="dialogFormVisible = true">添加品牌</el-button>
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

    <!-- 修改对话框 -->
      <el-dialog v-model="dialogFormVisible" title="添加品牌" width="500px">
        <el-form :model="form" style="display: flex; flex-direction: column;">
          <el-form-item label="品牌名" :label-width="formLabelWidth">
            <el-input placeholder="请输入品牌名称" v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="logo" v-model="form.image" :label-width="formLabelWidth">
            <el-upload
                class="avatar-uploader"
                action="https://localhost:5173"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
          </div>
        </template>
      </el-dialog>
</template>

<script lang='ts' setup>
    import { ref, onMounted, reactive } from 'vue'
    import { getProducts } from '@/api/product/product.ts'
    import { ElMessage } from 'element-plus'
    import { Plus } from '@element-plus/icons-vue'
    import type { UploadProps } from 'element-plus'
    // 写了ts类型，但是没加

    const dialogFormVisible = ref(false)
    const formLabelWidth = '20%'
    const form = reactive({
        name: '',
        image: ''
    })

    const imageUrl = ref('')

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
        response,
        uploadFile
    ) => {
        imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
            ElMessage.error('图片必须是jpg或png格式')
            return false
        } else if (rawFile.size / 1024 / 1024 > 10) {
            ElMessage.error('图片大小不要超过10MB')
            return false
        }
        return true
    }

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
    .avatar-uploader .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
</style>