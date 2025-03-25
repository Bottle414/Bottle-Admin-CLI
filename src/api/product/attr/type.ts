export interface Rank{
    id: number,
    name: string
}

export type RanksForm = Rank[]
export type RankId = number

export interface ReciveFrom {
    status: number,
    data: RanksForm
}