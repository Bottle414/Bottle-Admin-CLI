// 异步路由

import asyncRoutesOption from '@/schemas/router/asyncRoutes'

export const asyncRoutes = [
    {
        // 一级路由，项目页面框架
        name: 'layout',
        path: '/',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '菜单',
            icon: 'Menu',
            hidden: false
        },
        redirect: '/home',
        children: asyncRoutesOption
    }
]