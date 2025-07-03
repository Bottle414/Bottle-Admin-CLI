#!/usr/bin/env node
// bin/index.js

import inquirer from 'inquirer'
import { createProject } from '../src/createProject.js'
import { execa } from 'execa'

async function CLI() {
    const dependencies = []
    const devDependencies = []
    const imports = []
    const plugins = []
    let answers = {}

    const { name, useDefault } = await inquirer.prompt([
        { type: 'input', name: 'name', message: '项目名称:' },
        { type: 'confirm', name: 'useDefault', message: '使用默认配置？', default: true }
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
            useCommit: false,
            useMock: true
        }
    } else {
        const { features } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'features',
                message: '请选择要启用的功能模块(可多选)',
                choices: [
                    { name: 'i18n 国际化', value: 'useI18n', checked: true },
                    { name: 'ECharts 图表', value: 'useCharts' },
                    { name: 'Pinia 状态管理', value: 'usePinia', checked: true },
                    { name: 'Vue-Router 路由', value: 'useRouter', checked: true },
                    { name: '表格导出功能', value: 'useExport' },
                    { name: 'Mock 数据', value: 'useMock' },
                    { name: 'Node.js 后端', value: 'useServe', checked: true },
                    { name: '开发流水线', value: 'useCommit' },
                    { name: '--------------- 分隔线 ---------------'}
                ],
            },
        ])

        const restAnswers = {}
        for (const key of [
            'useI18n',
            'useCharts',
            'usePinia',
            'useRouter',
            'useExport',
            'useMock',
            'useServe',
            'useCommit',
        ]) {
            restAnswers[key] = features.includes(key)
        }

        answers = {
            name,
            useDefault,
            ...restAnswers
        }

        console.log(answers);
    }

    const { useI18n, useCharts, usePinia, useRouter, useExport, useMock } = answers

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

    if (useMock) {
        devDependencies.push('mockjs', 'vite-plugin-mock')
    }

    console.log('接下来将要安装 dependencies: ', dependencies,'devDependencies: ', devDependencies)

    const continueAnswer = await inquirer.prompt([
        { type: 'confirm', name: 'continue', message: '是否继续？' }
    ])

    if (!continueAnswer.continue) {
        console.log('流程中止')
    } else {
        await createProject(answers, dependencies, devDependencies, imports, plugins)

        const runAnswer = await inquirer.prompt([
            { type: 'confirm', name: 'run', message: '是否立即启动项目？' }
        ])

        if (runAnswer.run) {
            await execa('npm', ['run', 'dev'], {
                cwd: name,
                stdio: 'inherit'
            })
        } else {
            console.log(`请运行: cd ${name} && npm run dev`)
        }
    }
}

CLI()