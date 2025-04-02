<template>
    <div class="card">
        <el-card>
            <e-form class="select-form">
                <el-form-item style="width: 30%; min-width: 200px;" label="一级分类">
                    <!-- handler改变的值是前面那个model -->
                    <el-select :disabled="disable" v-model="categoryStore.rank1Id" @change="handler1()">
                        <el-option v-for="(rank1, index) in categoryStore.ranks1" :key="rank1.id" :label="rank1.name" :value="rank1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 30%; min-width: 200px;" label="二级分类">
                    <el-select :disabled="disable" v-model="categoryStore.rank2Id" @change="handler2()">
                        <el-option v-for="(rank2, index) in categoryStore.ranks2" :key="rank2.id" :label="rank2.name" :value="rank2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 30%; min-width: 200px;" label="三级分类">
                    <el-select :disabled="disable" v-model="categoryStore.rank3Id" @change="handler3()">
                        <el-option v-for="(rank3, index) in categoryStore.ranks3" :key="rank3.id" :label="rank3.name" :value="rank3.id"></el-option>
                    </el-select>
                </el-form-item>
            </e-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
    // 模板里一直报找不到对象是因为没导出、没写setup
    import useCategoryStore from '@/store/modules/categoryStore'// 引入分类小仓库
    import { onMounted, ref } from 'vue'

    defineProps(['disable'])

    const categoryStore = useCategoryStore()

    onMounted(async() => {
        // 清除数据
        categoryStore.rank1Id = ''
        categoryStore.rank2Id = ''
        // 获取一级分类
        await categoryStore.getRank1()  // 返回了promise
    })

    async function handler1(){// 上一级选中元素后触发 清空其他两级元素
        console.log(categoryStore.rank1Id);
        categoryStore.rank2Id = ''
        categoryStore.rank3Id = ''
        categoryStore.ranks3 = []// 二级分类不用清除，因为与1级绑定，一级变，二级也变
        try {
            await categoryStore.getRank2()
        } catch (error) {
            console.log(error);
        }
        
    }

    async function handler2(){// 上一级选中元素后触发
        categoryStore.rank3Id = ''
        console.log(categoryStore.rank2Id);
        await categoryStore.getRank3()
    }

    async function handler3(){
        console.log('rank3Id changed : ' + categoryStore.rank3Id);
    }

</script>

<style scoped>
    .select-form {
        display: flex;
        justify-content:space-between;
        transform: translateY(20%);
    }
</style>