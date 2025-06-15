import request from '@/api'
import type { AttrId, AttrRecive, RankId, ReciveFrom } from './type'

const BASE_URL = import.meta.env.VITE_SERVE + '/ranks'
const TAGS_BASE_URL = import.meta.env.VITE_SERVE + '/attrs'
enum API {
    GET_RANK1 = '/rank1',
    GET_RANK2 = '/rank2',
    GET_RANK3 = '/rank3',
    GET_TAGS = '/getTags',
    EDIT_TAGS = '/editTags',
    DELETE_ATTR = '/deleteAttr'
}

console.log('url ' + BASE_URL + API.GET_RANK1)

export function getCategory1(): Promise<ReciveFrom> {
    return request({
        url: BASE_URL + API.GET_RANK1,
        method: 'GET'
    })
}

export function getCategory2(rank1Id: RankId | string): Promise<ReciveFrom> {
    console.log('rank1' + rank1Id)
    return request({
        url: BASE_URL + API.GET_RANK2,
        method: 'GET',
        params: {
            rank1Id
        }
    })
}

export function getCategory3(rank2Id: RankId | string): Promise<ReciveFrom> {
    return request({
        url: BASE_URL + API.GET_RANK3,
        method: 'GET',
        params: {
            rank2Id
        }
    })
}

export function getTags(rankId: RankId): Promise<AttrRecive> {
    return request({
        url: TAGS_BASE_URL + API.GET_TAGS,
        method: 'GET',
        params: {
            rankId
        }
    })
}

export function editTags(
    attr_id: number | null,
    tag_id: number | null,
    rank_id: number,
    tag_name: string
): Promise<AttrRecive> {
    return request({
        url: TAGS_BASE_URL + API.EDIT_TAGS,
        method: 'POST',
        data: {
            attr_id,
            tag_id,
            rank_id,
            tag_name
        }
    })
}

export function deleteAttr(attrId: AttrId): Promise<AttrRecive> {
    return request({
        url: TAGS_BASE_URL + API.DELETE_ATTR,
        method: 'POST',
        data: {
            attrId
        }
    })
}
