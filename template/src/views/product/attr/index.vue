<template>
    <div class="sttr">
        <Category :disable="!view"/>

        <el-card style="margin-top: 20px;">
            <div class="watch-view" v-if="view">
                <el-button type="primary" icon="Plus" :disabled="!categoryStore.rank3Id" @click="addAttrs">添加属性</el-button>
                <el-table :data="attrs" border>
                    <el-table-column prop="attr_id" width="100%" align="center" type="index" label="序号"></el-table-column>
                    <el-table-column prop="attr_name" width="150%" label="属性名"></el-table-column>
                    <el-table-column prop="tags" min-width="300px" label="属性值">
                        <template #default="{ row }">
                            <el-tag v-for="tag in row.tags" :key="tag.tag_id" :type="tag.tag_id % 2 ? 'success' : 'warning'">{{ tag.tag_name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="250%" label="操作">
                        <template #default="{ row }">
                            <el-button title="修改" type="primary" icon="EditPen" @click="editTags"></el-button>
                            <el-button title="查看详情" icon="InfoFilled" type="warning"></el-button>
                            <el-button title="删除" icon="Delete" color="#ddd" @click="removeAttr(row.attr_id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="add-view" v-if="!view">
                <el-form>
                    <el-form-item label="属性编辑">
                        <el-input placeholder="请输入属性名……" v-model="form.attr_name" style="width: 200px;" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="Plus" type="primary" :disabled="!form.attr_name" @click="addTag">添加标签</el-button>
                    </el-form-item>
                    <el-table border :data=" attrs || form.tags">
                        <el-table-column type="index" label="序号" width="100%"></el-table-column>
                        <el-table-column prop="tags" label="标签名">
                            <!-- row 是form.tags -->
                            <template #default="{ row, index }">
                                <el-tag v-for="tag in row.tags" :key="tag.tag_id" :type="tag.tag_id % 2 ? 'success' : 'warning'">{{ tag.tag_name }}</el-tag>
                                <el-input :ref="(vc : any) => inputs[index] = vc" v-if="row.editing" @blur="toLook(row, index)" v-model="row.tag_name" placeholder="新的标签名"></el-input>
                                <div v-else @click="toSet(row, index)" style="width: 300px; height: 50px; background: #eee;">{{ row.tag_name }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="250%">
                            <template #default="{ row, index }">
                                <el-button icon="Delete" type="warning" @click="deleteTag(index)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form-item style="padding-top: 20px;">
                        <el-button type="success" icon="Select" @click="save">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang='ts' setup>
    import { watch, ref, nextTick } from 'vue'
    import useCategoryStore from '@/store/modules/categoryStore'
    import { getTags, editTags, deleteAttr } from '@/api/product/attr'
    import type { Attribute, Attributes, RankId, Tag } from '@/api/product/attr/type';
    import { ElMessage } from 'element-plus';
    const categoryStore = useCategoryStore()
    let attrs = ref<Attributes>([])
    let view = ref<boolean>(true)
    let inputs = ref<any>([])
    
    let form = ref<Attribute>({
        attr_id: null,
        rank_id: null,
        attr_name: '',
        tags: []
    })

    watch(() => categoryStore.rank3Id, async() => {
        const { rank1Id, rank2Id, rank3Id } = categoryStore
        attrs.value = []
        if (rank3Id !== ''){
            form.value.rank_id = rank3Id as number
            await getAttrs(rank3Id as number)
        }
    })
    
    async function getAttrs(rank3Id : RankId){
        try {
            const result = await getTags(rank3Id as number)
            if (result.status === 200){
                attrs.value = result.data
            }else {
                ElMessage('获取属性值失败')
            }
        } catch (error) {
            console.log('get attrs error : ' + error);
        }
    }

    async function removeAttr(attrId : number){
        const result = await deleteAttr(attrId)
        if (result.status === 200){
            ElMessage({
                type: 'success',
                message: '属性删除成功'
            })
            getAttrs(categoryStore.rank3Id as number)
        }else {
            ElMessage({
                type: 'error',
                message: '属性删除失败'
            })
        }
    }

    function addAttrs(){
        Object.assign(form.value, {
            attr_id: null,
            rank_id: null,
            attr_name: '',
            tags: []
        })
        view.value = !view.value
    }

    function cancel(){
        view.value = !view.value
    }

    function addTag(){
        form.value.tags.push({
            attr_id: null,
            tag_id: null,
            tag_name: '',
            editing: true
        })
        nextTick(() => {
            inputs.value[form.value.tags.length - 1]?.focus()
        })
    }

    function toSet(row : Tag, index : number){
        row.editing = true
        nextTick(() => {
            console.log(inputs.value);
            inputs.value[index].focus()
        })
    }

    function toLook(row : Tag, index : number){
        console.log(row);
        if (row.tag_name.trim() == ''){
            ElMessage({
                type: 'error',
                message: '标签名不能为空'
            })
            form.value.tags.splice(index, 1)
            return
        }

        form.value.tags.find(tag => {
            if (row !== tag && row.tag_name === tag.tag_name){
                ElMessage({
                    type: 'error',
                    message: '标签名已存在'
                })
                form.value.tags.splice(index, 1)
                return
            }
        })
        // 保存
        save(row.attr_id, row.tag_id, categoryStore.rank3Id as number, row.tag_name)
        console.log(row.attr_id, row.tag_id, categoryStore.rank3Id as number, row.tag_name);
        row.editing = false
    }

    function deleteTag(index : number){
        form.value.tags.splice(index, 1)
    }

    async function save(attr_id: number | null, tag_id: number | null, rank3Id: number, tag_name: string){
        try {
            const result = await editTags(attr_id, tag_id, rank3Id, tag_name)
            if (result.status === 200){
                ElMessage({
                    type: 'success',
                    message: '更新成功'
                })
                view.value = true
            }else {
                throw Error('更新失败! : ' + result.message)
            }
        } catch (error) {
            ElMessage({
                type: 'error',
                message: '更新失败! : ' + error
            })
        }
    }
</script>

<style scoped>
    
</style>