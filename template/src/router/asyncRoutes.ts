// 异步路由

export const asyncRoutes = [
    {
        name: 'layout',
        path: '/',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '菜单',
            icon: 'Menu',
            hidden: false
        },
        redirect: '/home',
        children: [
            {
                name: 'home',
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    hidden: false
                }
            },
            {
                name: 'table',
                path: '/table',
                meta: {
                    title: '表格',
                    icon: 'Lock',
                    hidden: false
                },
                children: [
                    {
                        name: 'user',
                        path: '/table/user',
                        component: () => import('@/views/table/user/index.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'User'
                        }
                    },
                    {
                        name: 'role',
                        path: '/table/role',
                        component: () => import('@/views/table/role/index.vue'),
                        meta: {
                            title: '角色管理',
                            icon: 'Avatar'
                        }
                    },
                    {
                        name: 'permission',
                        path: '/table/permission',
                        component: () =>
                            import('@/views/table/permission/index.vue'),
                        meta: {
                            title: '菜单管理',
                            icon: 'Menu'
                        }
                    }
                ]
            },
            {
                name: 'charts',
                path: '/charts',
                component: () => import('@/views/charts/index.vue'),
                meta: {
                    title: '图表',
                    icon: 'Monitor',
                    hidden: false
                }
            }
        ]
    }
]