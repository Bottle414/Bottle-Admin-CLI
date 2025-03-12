import { createRouter, createWebHistory } from "vue-router"
import { basicRoutes } from "./routes" // 这样可以让路由结构更清晰

const routes = [
	...basicRoutes, // ... 是 展开运算符（Spread Operator）的缩写。它用于将一个数组或对象的元素/属性 "展开" 到另一个数组或对象中。这个操作可以将多个数组或对象合并在一起，或者将数组/对象的元素传递给函数。
	// 不写展开: 在这种情况下，routes 数组中的每个元素都会是一个数组，不是单独的路由配置对象。这意味着你会把整个 authRoutes, userRoutes 和 settingsRoutes 数组当作单一元素放入 routes 中。最终，routes 变成了一个包含三个数组的二维数组，而不是一个简单的一维数组。
	{
		name: "any",
		path: "/:pathMatch(.*)*", // Vue Router 中的一个特殊路径匹配模式，用于匹配 所有路径，包括嵌套路由。它常用于捕获所有未定义的路由，通常用来实现 404 页面 或者处理其他特殊情况。
		redirect: "/notfound"
		/*
            :pathMatch：这是一个 动态路径参数，它会捕获所有路径的部分，包含子路径、查询参数等。

            pathMatch 只是一个自定义的参数名，可以改成任何名字，例如 :catchAll，但惯例上通常使用 pathMatch。
            (.*)：正则表达式中的 .* 表示 匹配零个或多个字符，即捕获所有字符，直到路径的结束。

            *：这个星号是 Vue Router 的捕获匹配，用于捕获所有的子路径，确保即使路径中有嵌套的部分也能匹配。
        */
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
    scrollBehavior(){
        return {// 滚动行为这段代码的作用是无论何时发生路由跳转，页面都会自动滚动到最顶部，最左侧的位置。这是一种常见的用户体验（UX）设计，确保用户在进入新的页面或视图时，总是从屏幕的起始位置开始阅读内容。
            left: 0,
            top: 0
        }
    }
})

export default router
