import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/* Element-plus 按需导入 */
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd()) // 加载env文件，获取环境变量
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
                // 开发环境跨域代理
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_SERVE, // 目标服务器
                    changeOrigin: true, // 是否更改 `Origin`,防止跨域拦截
                    rewrite: (path) => path.replace(/^\/api/, '') // 重写路径（去掉 `/api`）
                }
            }
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: `@use "@/style/_color.scss" as myColor;
                        @use "@/style/_variable.scss" as variable;`
                }
            }
        }
    }
})