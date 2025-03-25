const ranks1 = [// fake data
    {
        id: 1,
        name: '北京'
    },
    {
        id: 2,
        name: '上海'
    }
]

const ranks2 = [// fake data
    {
        id: 1,
        name: '手机'
    },
    {
        id: 2,
        name: '电视'
    }
]

const ranks3 = [// fake data
    {
        id: 1,
        name: '苹果'
    },
    {
        id: 2,
        name: '李子'
    }
]

import type { RankId, ReciveFrom } from "./type"

export function getCategory1() : Promise<ReciveFrom>{
    // TODO: 设计数据库，完成接口
    return Promise.resolve({
        status: 200,
        data: ranks1
    })
}

export function getCategory2(rank1Id : RankId | string) : Promise<ReciveFrom>{
    // TODO: 设计数据库，完成接口
    console.log('rank1Id : ' + rank1Id);
    return Promise.resolve({
        status: 200,
        data: ranks2
    })
}

export function getCategory3(rank2Id : RankId | string) : Promise<ReciveFrom>{
    // TODO: 设计数据库，完成接口
    console.log('rank2Id : ' + rank2Id);
    return Promise.resolve({
        status: 200,
        data: ranks3
    })
}