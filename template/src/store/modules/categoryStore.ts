import { getCategory1, getCategory2, getCategory3 } from "@/api/product/attr"
import type { RanksState } from "../type"
import { defineStore } from "pinia"

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

        async getRank1(){
            try {
                const result = await getCategory1()
                if (result.status === 200){
                    this.ranks1 = result.data
                    console.log(result.message);
                }
            } catch (error) {
                console.log('getRank1 error : ' + error)
            }
            
        },

        async getRank2(){
            try {
                const result = await getCategory2(this.rank1Id)
                if (result.status === 200){
                    this.ranks2 = result.data
                    console.log(result.message);
                }
            } catch (error) {
                console.log('getRank2 error : ' + error);   
            }
        },

        async getRank3(){
            try {
                const result = await getCategory3(this.rank2Id)
                if (result.status === 200){
                    this.ranks3 = result.data
                    console.log(result.message);
                }
            } catch (error) {
                console.log('getRank3 errror : ' + error);
            }
            
        }
    },
    getters: {

    }
})

export default useCategoryStore