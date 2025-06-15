import request from '@/api'
import type { BrandInfo, BrandId, ReciveAllFrom, ReciveFrom } from './type.ts'

const BRAND_BASE = '/brand'
enum API {
    ALL_URL = '/allInfo',
    GET_URL = '/brandInfo',
    ADD_URL = '/addInfo',
    UPDATE_URL = '/updateInfo',
    DELETE_URL = '/deleteInfo'
}

// 获取所有品牌
export function getAllBrands(): Promise<ReciveAllFrom> {
    return request({
        url: BRAND_BASE + API.ALL_URL,
        method: 'GET'
    })
}

// 获取某个品牌
export function getBrand(brandId: BrandId): Promise<ReciveFrom> {
    return request({
        url: BRAND_BASE + API.GET_URL,
        method: 'POST',
        data: brandId
    })
}

// 添加品牌
export function addBrand(brandInfo: BrandInfo): Promise<ReciveFrom> {
    console.log('add brand recive : ' + brandInfo)
    return request({
        url: BRAND_BASE + API.ADD_URL,
        method: 'POST',
        data: brandInfo
    })
}

// 更新品牌
export function updateBrand(brandInfo: BrandInfo): Promise<ReciveFrom> {
    return request({
        url: BRAND_BASE + API.UPDATE_URL,
        method: 'POST',
        data: brandInfo
    })
}

// 删除品牌
export function deleteBrand(brandId: BrandId): Promise<ReciveFrom> {
    return request({
        url: BRAND_BASE + API.DELETE_URL,
        method: 'POST',
        data: brandId
    })
}
