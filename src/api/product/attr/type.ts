export interface Rank{
    id: number,
    name: string,
    parent_id: number | null
}

export type RanksForm = Rank[]
export type RankId = number

export interface ReciveFrom {
    message: string,
    status: number,
    data: RanksForm
}

export interface Attribute{
    attr_id: number | null,
    rank_id: number | null,
    attr_name: string
}

export interface Tag{
    attr_id: number | null,
    tag_id: number | null,
    tag_name: string,
    editing?: boolean
}

export type Tags = Tag[]

export interface Attribute {
    attr_id: number | null,
    attr_name: string,
    rank_id: number | null,
    tags: Tags
}

export type Attributes = Attribute[]

export interface AttrRecive {
    status: number,
    message: string,
    data: Attributes
}

export type AttrId = number