import fs from 'fs-extra'
import path from 'path'
import { execa } from 'execa'
import type { BottleConfig } from './bottle.config'

export async function createProject(answers: BottleConfig) {
    const { name, useTS, useI18n, useCharts, useRouter, useExport } = answers

    const targetDir = path.resolve(process.cwd(), name)
    const templateDir = path.resolve(__dirname, '../template')

    // 拷贝基础模板
    await fs.copy(templateDir, targetDir)

    // 动态修改 main.ts
    const mainFile = path.resolve(targetDir, 'src/main.ts')
    let mainContent = await fs.readFile(mainFile, 'utf-8')

    const imports: string[] = []
    const plugins: string[] = []
    const dependencies: string[] = []

    if (useTS) {
        // 那么写入……另一个模板？？
    }

    if (useI18n) {
        imports.push(`import i18n from './i18n'`)
        plugins.push(`app.use(i18n)`)
        dependencies.push('vue-i18n')
    }else {
        await fs.remove(path.resolve(targetDir, 'src/locales'))
    }

    if (useCharts) {
        imports.push(`import * as echarts from 'echarts'`)
        plugins.push(`app.config.globalProperties.$echarts = echarts`)
        dependencies.push('echarts')
    }

    if (useRouter) {
        imports.push(`import router from './router'`)
        plugins.push(`app.use(router)`)
        dependencies.push('vue-router')
    }

    if (useExport) {
        dependencies.push('xlsx')
    }

    mainContent = imports.join('\n') + '\n' + mainContent
    mainContent = mainContent.replace(
        'app.mount',
        `${plugins.join('\n') + '\n'}app.mount`
    )
    await fs.writeFile(mainFile, mainContent)

    // 更新 package.json 依赖
    const pkgPath = path.resolve(targetDir, 'package.json')
    const pkg = await fs.readJson(pkgPath)

    // 确保必要字段
    pkg.name = pkg.name || name
    pkg.version = pkg.version || '1.0.0'
    pkg.private = pkg.private ?? true
    pkg.type = pkg.type || 'module'

    pkg.dependencies = pkg.dependencies || {}

    dependencies.forEach((dep) => {
        if (pkg.dependencies?.[dep]) {
            pkg.dependencies[dep] = 'latest'
        }
    })
    await fs.writeJson(pkgPath, pkg, { spaces: 2 })

    // 4. 安装依赖
    await execa('npm', ['install'], { cwd: targetDir, stdio: 'inherit' })

    // 5. 完成提示
    console.log(
        `\n🎉 项目 ${name} 创建成功！请运行：\ncd ${name} && npm run dev`
    )
}
