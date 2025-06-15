import { createRouter, createWebHistory } from "vue-router"
import { basicRoutes } from "./basicRoutes.ts"
import { asyncRoutes } from "./asyncRoutes.ts"
export const routes = [
	...basicRoutes,
    ...asyncRoutes,
	{
		name: "any",
		path: "/:pathMatch(.*)*",
		redirect: "/notfound"
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes,
    scrollBehavior(){
        return {
            left: 0,
            top: 0
        }
    }
})

export default router
