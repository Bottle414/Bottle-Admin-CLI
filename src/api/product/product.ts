import request from "@/utils/request"

enum API {
    PRODUCTS_URL = 'http://localhost:3001/Products'
}

export function getProducts(page : number, size : number){// 获取第几页，多少条数据
    return request.get(API.PRODUCTS_URL)
}