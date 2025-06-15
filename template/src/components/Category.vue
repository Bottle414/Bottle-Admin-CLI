<template>
    <div class="card">
        <el-card>
            <e-form class="select-form">
                <el-form-item style="width: 30%; min-width: 200px;" :label="$t('ranks[0]')">
                    <el-select :disabled="disable" v-model="categoryStore.rank1Id" @change="handler1()">
                        <el-option v-for="(rank1, index) in categoryStore.ranks1" :key="rank1.id" :label="rank1.name" :value="rank1.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 30%; min-width: 200px;" :label="$t('ranks[1]')">
                    <el-select :disabled="disable" v-model="categoryStore.rank2Id" @change="handler2()">
                        <el-option v-for="(rank2, index) in categoryStore.ranks2" :key="rank2.id" :label="rank2.name" :value="rank2.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 30%; min-width: 200px;" :label="$t('ranks[2]')">
                    <el-select :disabled="disable" v-model="categoryStore.rank3Id" @change="handler3()">
                        <el-option v-for="(rank3, index) in categoryStore.ranks3" :key="rank3.id" :label="rank3.name" :value="rank3.id"></el-option>
                    </el-select>
                </el-form-item>
            </e-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
    import useCategoryStore from '@/store/modules/categoryStore'
    import { onMounted, ref } from 'vue'

    defineProps(['disable'])

    const categoryStore = useCategoryStore()

    onMounted(async() => {
        categoryStore.rank1Id = ''
        categoryStore.rank2Id = ''
        categoryStore.rank3Id = ''

        await categoryStore.getRank1()
    })

    // 选中一级分类
    async function handler1(){
        console.log(categoryStore.rank1Id);
        categoryStore.rank2Id = ''
        categoryStore.rank3Id = ''
        categoryStore.ranks3 = []
        try {
            await categoryStore.getRank2()
        } catch (error) {
            console.log(error);
        }
        
    }

    // 选中二级分类
    async function handler2(){
        categoryStore.rank3Id = ''
        console.log(categoryStore.rank2Id);
        await categoryStore.getRank3()
    }

    // 选中三级分类
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