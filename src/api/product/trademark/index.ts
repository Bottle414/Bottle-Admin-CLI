import request from "@/api"
import type { BrandInfo, BrandId } from './type.ts'

const BRAND_BASE = '/brand'
enum API {
    ALL_URL = '/allInfo',
    GET_URL = '/brandInfo',
    ADD_URL = '/addInfo',
    UPDATE_URL = '/updateInfo',
    DELETE_URL = '/deleteInfo'
}

// 获取所有品牌
export function getAllBrands(){
    // TODO: 根据页面数获取对应数量的品牌
    return request({
        url: BRAND_BASE + API.ALL_URL,
        method: 'GET'
    })
}

// 获取某个品牌
export function getBrand(brandId : BrandId){
    return request({
        url: BRAND_BASE + API.GET_URL,
        method: 'POST',
        data: brandId
    })
}

// 添加品牌
export function addBrand(brandInfo : BrandInfo){
    return request({
        url: BRAND_BASE + API.ADD_URL,
        method: 'POST',
        data: brandInfo
    })
}

// 更新品牌
export function updateBrand(brandInfo : BrandInfo){
    return request({
        url: BRAND_BASE + API.UPDATE_URL,
        method: 'POST',
        data: brandInfo
    })
}

// 删除品牌
export function deleteBrand(brandId : BrandId){
    return request({
        url: BRAND_BASE + API.DELETE_URL,
        method: 'POST',
        data: brandId
    })
}