import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { execa } from 'execa'

/**
 * @param {string} name - 项目名称
 * @param {string[]} dependencies - 要安装的依赖
 * @param {string[]} imports - 需要插入 main.ts 的 import 语句
 * @param {string[]} plugins - 需要插入的 app.use / 挂载语句
 */

export async function createProject(name, dependencies, imports, plugins) {

    const targetDir = path.resolve(process.cwd(), name)
    let __dirname

    if (!__dirname) {
        const __filename = fileURLToPath(import.meta.url)
        __dirname = path.dirname(__filename)
    }
    const templateDir = path.resolve(__dirname, '../template')

    // 拷贝基础模板
    await fs.copy(templateDir, targetDir)

    // 动态修改 main.ts
    const mainFile = path.resolve(targetDir, 'src/main.ts')
    let mainContent = await fs.readFile(mainFile, 'utf-8')

    mainContent = mainContent.replace('// ~imports~', imports.join('\n'))
    mainContent = mainContent.replace('// ~plugins~', plugins.join('\n'))

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

    for (const dep of dependencies) {
        pkg.dependencies[dep] = 'latest'
    }

    await fs.writeJson(pkgPath, pkg, { spaces: 2 })

    // 安装依赖
    await execa('npm', ['install'], { cwd: targetDir, stdio: 'inherit' })

    console.log(
        `\n🎉 项目 ${name} 依赖安装完成，创建成功！`
    )
}
