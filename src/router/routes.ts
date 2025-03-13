export const basicRoutes = [
    {
        name: 'about',
        path: '/about',
        component: () => import('@/views/About.vue'),
        meta: {
            title: '关于',
            hidden: true    // 是否在layout展示
        }
    },
    {
        name: 'notfound',
        path: '/notfound',
        component: () => import('@/views/notfound/index.vue'),
        meta: {
            title: '404',
            hidden: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            icon:'Promotion',   // layout菜单项左侧图标
            hidden: true
        }
    },
    {
        name: 'layout',// 登录成功后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '层叠',
            icon: 'Menu',
            hidden: false
        },
        redirect: '/home',// 如果重定向路由本来没有meta不要硬加，防止vue报错可以先过滤
        children: [
            {
                name: 'home',
                path: 'home',
                component: () => import('@/views/home/index.vue'), // 这是 懒加载（lazy loading） 路由的写法，常见于 Vue Router 配置中，用于按需加载组件。具体来说，它利用了 动态 import() 来实现异步加载组件，而不是在页面加载时一次性加载所有的组件，能优化页面加载速度和性能。
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    hidden: false
                }
            },
            {
                name: 'manage',
                path: 'manage',
                component: () => import('@/views/notfound/index.vue'), // 这是 懒加载（lazy loading） 路由的写法，常见于 Vue Router 配置中，用于按需加载组件。具体来说，它利用了 动态 import() 来实现异步加载组件，而不是在页面加载时一次性加载所有的组件，能优化页面加载速度和性能。
                meta: {
                    title: '权限管理',
                    icon: 'Lock',
                    hidden: false
                },
                children: [
                    {
                        name: 'user',
                        path: 'user',
                        component: () => import('@/views/notfound/index.vue'),
                        meta: {
                            title: '用户管理',
                            icon: 'User'
                        }
                    },
                    {
                        name: 'role',
                        path: 'role',
                        component: () => import('@/views/notfound/index.vue'),
                        meta: {
                            title: '角色管理',
                            icon: 'Avatar'
                        }
                    },
                    {
                        name: 'menu',
                        path: 'menu',
                        component: () => import('@/views/notfound/index.vue'),
                        meta: {
                            title: '菜单管理',
                            icon: 'Menu'
                        }
                    }
                ]
            }
        ]
    }
]