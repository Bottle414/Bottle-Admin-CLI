/**
 * 异步路由配置项：
 * 
 *  name: 路由名称
 *  path: 路由路径
 *  component: 路由组件， () => import() 为路由懒加载
 *  redirect: 路由重定向
 *  meta: 路由元信息，提供路由额外信息
 *  meta.title: 标题，显示在页签上
 *  meta.icon: 对应的侧边栏图表
 *  meta.hidden: 是否展示在侧边栏
 */

const asyncRoutesOption = [
    /** 
     * 此处为二级路由: 
     * 显示在页面侧边栏右侧，此处是示例
     * 
     * 一级路由为 layout， 位于 @/router/asyncRoutes.ts 中
     */

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
    // ~extraRoutes~
]

export default asyncRoutesOption