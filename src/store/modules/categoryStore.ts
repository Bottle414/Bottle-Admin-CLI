import { getCategory1, getCategory2, getCategory3 } from "@/api/product/attr"
import type { RanksState } from "../type"
import { defineStore } from "pinia"
import type { RanksForm, RankId } from "@/api/product/attr/type"
// 分类数据全组件共享，免得涉及组件通信

const useCategoryStore = defineStore('category',{
    state() : RanksState {
        return {
            ranks1: [],
            ranks2: [],
            ranks3: [],
            rank1Id: '',
            rank2Id: '',
            rank3Id: ''
        }
    },
    actions: {
        // 在此处获取数据
        async getRank1(){
            const result = await getCategory1()
            if (result.status === 200){
                this.ranks1 = result.data
            }
        },

        async getRank2(){
            const result = await getCategory2(this.rank1Id)
            if (result.status === 200){
                this.ranks2 = result.data
            }
        },

        async getRank3(){
            console.log('rank2Id : ' + this.rank2Id);
            const result = await getCategory3(this.rank2Id)
            if (result.status === 200){
                this.ranks3 = result.data
            }
        }
    },
    getters: {

    }
})

export default useCategoryStore