import inquirer from 'inquirer'
import { createProject } from '../src/createProject.js'
import { execa } from 'execa'

async function CLI() {
    const dependencies = []
    const imports = []
    const plugins = []
    let answers = {}

    const { name, useDefault } = await inquirer.prompt([
        { type: 'input', name: 'name', message: '项目名称:' },
        { type: 'confirm', name: 'useDefault', message: '使用默认配置？' }
    ])

    if (useDefault) {
        answers = {
            name,
            useDefault,
            useTS: true,
            useI18n: true,
            useCharts: true,
            useRouter: true,
            useExport: true,
            usePinia: true,
            useCommit: false
        }
    } else {
        const restAnswers = await inquirer.prompt([
            { type: 'confirm', name: 'useI18n', message: '是否启用国际化？' },
            { type: 'confirm', name: 'useCharts', message: '是否启用 ECharts？' },
            { type: 'confirm', name: 'usePinia', message: '是否启用 Pinia？' },
            { type: 'confirm', name: 'useRouter', message: '是否启用动态路由？' },
            {
                type: 'confirm',
                name: 'useExport',
                message: '是否启用表格导出功能？'
            },
            { type: 'confirm', name: 'useCommit', message: '是否配置提交流水线？' }
        ])

        answers = {
            name,
            useDefault,
            ...restAnswers
        }
    }

    const { useI18n, useCharts, usePinia, useRouter, useExport } = answers

    if (useI18n) {
        imports.push(`import i18n from './locales'`)
        plugins.push(`app.use(i18n)`)
        dependencies.push('vue-i18n')
    } else {
        await fs.remove(path.resolve(targetDir, 'src/locales'))
    }

    if (useCharts) {
        imports.push(`import * as echarts from 'echarts'`)
        plugins.push(`app.config.globalProperties.$echarts = echarts`)
        dependencies.push('echarts')
    }

    if (usePinia) {
        imports.push(`import pinia from './store'`)
        plugins.push(`app.use(pinia)`)
        dependencies.push('pinia')
    }

    if (useRouter) {
        imports.push(`import router from './router'`)
        plugins.push(`app.use(router)`)
        dependencies.push('vue-router')
    }

    if (useExport) {
        dependencies.push('xlsx')
    }

    console.log('接下来将要安装', dependencies)

    const continueAnswer = await inquirer.prompt([
        { type: 'confirm', name: 'continue', message: '是否继续？' }
    ])

    if (!continueAnswer.continue) {
        console.log('流程中止')
    } else {
        await createProject(answers.name, dependencies, imports, plugins)

        const runAnswer = await inquirer.prompt([
            { type: 'confirm', name: 'run', message: '是否立即启动项目？'}
        ])

        if (runAnswer) {
            await execa('npm', ['run', 'dev'], {
                cwd: name,
                stdio: 'inherit'
            })
        }else {
            console.log(`请运行: cd ${name} && npm run dev`)
        }
    }
}

CLI()