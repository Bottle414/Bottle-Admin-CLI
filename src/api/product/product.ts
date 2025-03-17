import request from "@/utils/request"
import { nanoid } from "nanoid"

enum API {
    PRODUCTS_URL = 'http://localhost:3001/Products',
    TOTAL_URL = 'http://localhost:3001/Total'
}

export function getProducts(page : number, size : number){// 获取第几页，多少条数据
    return request.get(API.PRODUCTS_URL)
}

export function getTotal(){
    return request.get(API.TOTAL_URL)
}

export async function addProduct(name : string, logo : string, total : number){
    // json-server 在 POST 请求时默认会自动添加 id 所以json里面现在都带上id了
    const newPoduct = {// json-server 在 POST 请求时默认会自动添加 id 所以json里面现在都带上id了
        "index": total + 1,
        "name": name,
        "logo": logo,
        "id": nanoid()
    }
    try {
        await request.post(API.PRODUCTS_URL, newPoduct)
        await request.put(API.TOTAL_URL, {"total": total + 1})// 待修改：这里不好，可能已经添加但是总和修改失败。最好还是在同一url里修改
        return 'ok'
    } catch (error) {
        return Promise.reject('添加品牌失败')// 这里报错信息也由id存在与否看是添加还是修改
    }
}

export async function editProduct(name : string, logo : string, id : string){
    const newPoduct = {
        "name": name,
        "logo": logo,
        "id": id
    }
    try {
        await request.put(`${ API.PRODUCTS_URL }/${ id }`, newPoduct)
        return 'ok'
    } catch (error) {
        return Promise.reject('修改品牌失败')
    }
}