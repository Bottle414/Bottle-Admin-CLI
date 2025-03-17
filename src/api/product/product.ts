import request from "@/utils/request"
import { nanoid } from "nanoid"

enum API {
    PRODUCTS_URL = 'http://localhost:3001/Products'
}

export function getProducts(page : number, size : number){// 获取第几页，多少条数据
    return request.get(API.PRODUCTS_URL)
}

export async function addProduct(name : string, logo : string, id : string){
    // json-server 在 POST 请求时默认会自动添加 id 所以json里面现在都带上id了
    const newPoduct = {// json-server 在 POST 请求时默认会自动添加 id 所以json里面现在都带上id了
        "index": nanoid(),
        "name": name,
        "logo": logo,
        "id": id || nanoid()
    }
    try {
        if (id){// id存在，是更新
            await request.put(`${ API.PRODUCTS_URL }/${ id }`, newPoduct)// 用 json-server 作为后端，json-server 需要 PUT 直接指定 ID，不能用 ?name= 查询,也不能?id= 显示notfound
        }else {
            await request.post(API.PRODUCTS_URL, newPoduct)
        }
        return 'ok'
    } catch (error) {
        return Promise.reject(id ? '修改品牌失败' : '添加品牌失败')// 这里报错信息也由id存在与否看是添加还是修改
    }
}