import request from "@/utils/request"
import { nanoid } from "nanoid"

const BRAND_BASE_URL = import.meta.env.VITE_SERVE + '/brand'
enum API {
    ALLINFO_URL = '/allInfo',
    BRANDINFO_URL = '/brandInfo',
    ADDINFO_URL = '/addInfo',
    UPDATEINFO_URL = '/updateInfo',
    DELETEINFO_URL = '/deleteInfo',
}

export function getProducts(page : number, size : number){// 获取第几页，多少条数据
    return request.get(BRAND_BASE_URL + API.ALLINFO_URL)
}

export function getTotal(){
    return request.get(API.BRANDINFO_URL)
}

export async function addProduct(name : string, logo : string){
    // json-server 在 POST 请求时默认会自动添加 id 所以json里面现在都带上id了
    const newPoduct = {// json-server 在 POST 请求时默认会自动添加 id 所以json里面现在都带上id了
        "name": name,
        "logo": logo
    }
    try {
        await request.post(BRAND_BASE_URL + API.ADDINFO_URL, newPoduct)
        return 'ok'
    } catch (error) {
        return Promise.reject('添加品牌失败')// 这里报错信息也由id存在与否看是添加还是修改
    }
}

export async function editProduct(name : string, logo : string, id : number){
    const newPoduct = {
        "name": name,
        "logo": logo,
        "id": id
    }
    try {
        await request.post(BRAND_BASE_URL + API.UPDATEINFO_URL, newPoduct)
        return 'ok'
    } catch (error) {
        return Promise.reject('修改品牌失败')
    }
}

export async function deleteProduct(id : string, total : number){
    try {
        await request.delete(BRAND_BASE_URL + API.DELETEINFO_URL)
        await request.put(API.TOTAL_URL, {"total": total - 1})// 待修改：这里不好，可能已经添加但是总和修改失败。最好还是在同一url里修改
        return 'ok'
    } catch (error) {
        return Promise.reject('删除品牌失败')
    }
}