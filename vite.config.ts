import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

// 需要自动根据环境改变服务器域名只能写成回调了
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd()) // 加载env文件，获取环境变量 从哪里来(其实代表根目录)
	return {
		plugins: [
			vue(),
			vueDevTools(),
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			})
		],
		server: {
			proxy: {
				// 开发环境才会生效 []表示里面的是变量，会解析
				[env.VITE_APP_BASE_API]: {
					target: env.VITE_SERVE, // 目标服务器
					changeOrigin: true, // 是否更改 `Origin`,防止跨域拦截
					rewrite: (path) => path.replace(/^\/api/, "") // 重写路径（去掉 `/api`）,被替换为target 有多个服务器，可以直接在后面添加
				}
			}
		},
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url))
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
					additionalData: `@use "@/style/_color.scss" as myColor;
                        @use "@/style/_variable.scss" as variable;` // 注意路径 多个使用\n连接,模板字符串直接换行就好
				}
			}
		}
	}
})
