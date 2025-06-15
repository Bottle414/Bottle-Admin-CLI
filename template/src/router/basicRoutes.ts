// 常量路由
export const basicRoutes = [
	{
		name: "about",
		path: "/about",
		component: () => import("@/views/About.vue"),
		meta: {
			title: "关于",
			hidden: true // 是否在layout展示
		}
	},
	{
		name: "register",
		path: "/register",
		component: () => import("@/views/register/index.vue"),
		meta: {
			title: "注册",
			icon: "Promotion",
			hidden: true
		}
	},
	{
		name: "login",
		path: "/login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录",
			icon: "Promotion", // layout菜单项左侧图标
			hidden: true
		}
	},
	{
		name: "notfound",
		path: "/notfound",
		component: () => import("@/views/notfound/index.vue"),
		meta: {
			title: "404",
			hidden: true
		}
	},
]
