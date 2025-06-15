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
                name: 'acl',
                path: '/acl',
                meta: {
                    title: '权限管理',
                    icon: 'Lock',
                    hidden: false
                },
                children: [
                    {
                        name: 'user',
                        path: '/acl/user',
                        component: () => import('@/views/acl/user/index.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'User'
                        }
                    },
                    {
                        name: 'role',
                        path: '/acl/role',
                        component: () => import('@/views/acl/role/index.vue'),
                        meta: {
                            title: '角色管理',
                            icon: 'Avatar'
                        }
                    },
                    {
                        name: 'permission',
                        path: '/acl/permission',
                        component: () =>
                            import('@/views/acl/permission/index.vue'),
                        meta: {
                            title: '菜单管理',
                            icon: 'Menu'
                        }
                    }
                ]
            },
            {
                name: 'product',
                path: '/product',
                meta: {
                    title: '商品管理',
                    icon: 'Goods',
                    hidden: false
                },
                children: [
                    {
                        name: 'trademark',
                        path: '/trademark',
                        component: () =>
                            import('@/views/product/trademark/index.vue'),
                        meta: {
                            title: '品牌管理',
                            icon: 'ShoppingCart'
                        }
                    },
                    {
                        name: 'attr',
                        path: '/attr',
                        component: () =>
                            import('@/views/product/attr/index.vue'),
                        meta: {
                            title: '属性管理',
                            icon: 'Avatar'
                        }
                    },
                    {
                        name: 'spu',
                        path: '/spu',
                        component: () =>
                            import('@/views/product/spu/index.vue'),
                        meta: {
                            title: 'SPU管理',
                            icon: 'ShoppingBag'
                        }
                    },
                    {
                        name: 'sku',
                        path: '/sku',
                        component: () =>
                            import('@/views/product/sku/index.vue'),
                        meta: {
                            title: 'SKU管理',
                            icon: 'Menu'
                        }
                    }
                ]
            },
            {
                name: 'screen',
                path: '/screen',
                component: () => import('@/views/screen/index.vue'),
                meta: {
                    title: '数据大屏',
                    icon: 'Monitor',
                    hidden: false
                }
            }
        ]
    }
]