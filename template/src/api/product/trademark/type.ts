export interface BrandInfo {
    id?: number
    name: string
    logo: string
}

export interface ReciveFrom {
    status: number
    message: string
    data: BrandInfo
}

export interface ReciveAllFrom {
    status: number
    message: string
    data: {
        total: Total
        brands: BrandInfo[]
    }
}

export type Total = number
export type BrandId = number
