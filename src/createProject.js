import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execa } from 'execa'

/**
 * @param {string} answers - 项目参数
 * @param {string[]} dependencies - 要安装的依赖
 * @param {string[]} imports - 需要插入 main.ts 的 import 语句
 * @param {string[]} plugins - 需要插入的 app.use / 挂载语句
 */

export async function createProject(answers, dependencies, devDependencies, imports, plugins) {

    const { name, useI18n, useCharts, useExport, useProxy, useMock } = answers

    const targetDir = path.resolve(process.cwd(), name)
    let __dirname

    if (!__dirname) {
        const __filename = fileURLToPath(import.meta.url)
        __dirname = path.dirname(__filename)
    }
    const templateDir = path.resolve(__dirname, '../template')

    // 拷贝基础模板
    await fs.copy(templateDir, targetDir)

    const extraRoutes = []
    const moduleDir = path.resolve(__dirname, '../modules')

    // 拷贝额外模块
    if (useI18n) {
        await fs.copy(path.join(moduleDir, 'locales'), path.join(targetDir, 'src/locales'))
    }

    if (useCharts) {
        await fs.copy(path.join(moduleDir, 'charts/files'), path.join(targetDir, 'src/components/charts'))
        await fs.copy(path.join(moduleDir, 'charts/views'), path.join(targetDir, 'src/views/charts'))
        await fs.copy(path.join(moduleDir, 'charts/schemas'), path.join(targetDir, 'src/schemas/charts'))

        const routeString = `{
            name: 'charts',
            path: '/charts',
            component: () => import('@/views/charts/index.vue'),
            meta: {
              title: '图表',
              icon: 'Monitor',
              hidden: false
            }
        }`

        extraRoutes.push(routeString)
    }

    if (useExport) {
        await fs.copy(
            path.join(moduleDir, 'exportbutton'),
            path.join(targetDir, 'src/components')
        )
    }

    if (useMock) {
        await fs.copy(
            path.join(moduleDir, 'mock'),
            path.join(targetDir, 'src/mock')
        )
    }

    // 动态修改路由
    const routeFile = path.resolve(targetDir, 'src/schemas/router/asyncRoutes.ts')
    let routeContent = await fs.readFile(routeFile, 'utf-8')

    routeContent = routeContent.replace('// ~extraRoutes~', extraRoutes.join(',\n'))

    await fs.writeFile(routeFile, routeContent)

    // 动态修改 main.ts
    const mainFile = path.resolve(targetDir, 'src/main.ts')
    let mainContent = await fs.readFile(mainFile, 'utf-8')

    mainContent = mainContent.replace('// ~imports~', imports.join('\n'))
    mainContent = mainContent.replace('// ~plugins~', plugins.join('\n'))

    await fs.writeFile(mainFile, mainContent)

    // 动态修改 vite.config.ts
    const viteFile = path.resolve(targetDir, './vite.config.ts')
    let viteContent = await fs.readFile(viteFile, 'utf-8')
    const proxy = useProxy ? `
    server: {
        proxy: {
            // 开发环境跨域代理
            [env.VITE_APP_BASE_API]: {
                target: env.VITE_SERVE, // 目标服务器
                changeOrigin: true, // 是否更改 Origin, 防止跨域拦截
                rewrite: (path) => path.replace(/^\/api/, '') // 重写路径 (去掉 '/api')
            }
        }
    },` : ''
    const mock = useMock ? `viteMockServe({
                mockPath: './src/mock',       // mock 文件夹
                watchFiles: true
            }),` : ''

    viteContent = viteContent.replace('// ~proxy~', proxy)
    viteContent = viteContent.replace('// ~mock~', mock)
    viteContent = viteContent.replace('// ~import~', useMock ? "import { viteMockServe } from 'vite-plugin-mock'" : '')

    await fs.writeFile(viteFile, viteContent, 'utf-8')

    // 更新 package.json 依赖
    const pkgPath = path.resolve(targetDir, 'package.json')
    const pkg = await fs.readJson(pkgPath)

    // 确保必要字段
    pkg.name = pkg.name || name
    pkg.version = pkg.version || '1.0.0'
    pkg.private = pkg.private ?? true
    pkg.type = pkg.type || 'module'

    pkg.dependencies = pkg.dependencies || {}
    pkg.devDependencies = pkg.devDependencies || {}

    await fs.writeJson(pkgPath, pkg, { spaces: 2 })

    // 安装依赖
    await execa('npm', ['install', ...dependencies, '--save'], { cwd: targetDir, stdio: 'inherit' })
    await execa('npm', ['install', ...devDependencies, '--save-dev'], { cwd: targetDir, stdio: 'inherit' })

    console.log(
        `\n🎉 项目 ${name} 依赖安装完成，创建成功！`
    )
}
