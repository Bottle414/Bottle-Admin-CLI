import request from "@/utils/request"
import { nanoid } from "nanoid"

enum API {
    PRODUCTS_URL = 'http://localhost:3001/Products'
}

export function getProducts(page : number, size : number){// 获取第几页，多少条数据
    return request.get(API.PRODUCTS_URL)
}

export async function addProduct(name : string, logo : string){
    // json-server 在 POST 请求时默认会自动添加 id 所以json里面现在都带上id了
    const newPoduct = {
        "index": nanoid(),
        "name": name,
        "logo": logo
    }
    try {
        await request.post(API.PRODUCTS_URL, newPoduct)
        return 'ok'
    } catch (error) {
        return Promise.reject('添加品牌失败')
    }   
}