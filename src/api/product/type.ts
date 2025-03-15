export interface ResponseData{
    code: number,
    message: string,
    data: {
        products: Products
    },
    ok: boolean
}
export interface Product{
    id?:number, // 新增没有id
    name: string,
    logo: string
}

export type Products = Product[]