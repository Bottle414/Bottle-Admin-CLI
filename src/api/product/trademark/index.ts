import request from "@/api"
import type { BrandInfo, BrandId } from './type.ts'

// 获取所有品牌
export function getAllBrands(){
    return request({
        url: '/allInfo',
        method: 'GET'
    })
}

// 获取某个品牌
export function getBrand(brandId : BrandId){
    return request({
        url: '/brandInfo',
        method: 'POST',
        data: brandId
    })
}

// 添加品牌
export function addBrand(brandInfo : BrandInfo){
    return request({
        url: '/addInfo',
        method: 'POST',
        data: brandInfo
    })
}

// 更新品牌
export function updateBrand(brandInfo : BrandInfo){
    return request({
        url: '/updateInfo',
        method: 'POST',
        data: brandInfo
    })
}

// 删除品牌
export function deleteBrand(brandId : BrandId){
    return request({
        url: '/addInfo',
        method: 'POST',
        data: brandId
    })
}