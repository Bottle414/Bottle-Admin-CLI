#!/usr/bin/env node
// bin/index.js

import inquirer from 'inquirer'
import { createProject } from '../src/createProject.js'
import { execa } from 'execa'
import config from '../config.js'

// commander 相关
import { program } from 'commander'
import { cliHelp } from '../lib/core/help.js'
import { cliCommander } from '../lib/core/commander.js'

cliHelp(program)
cliCommander(program)

program.parse(program.argv)

// 交互式命令
async function CLI() {
    let answers = {}

    const { name, useDefault } = await inquirer.prompt([
        { type: 'input', name: 'name', message: '项目名称:' },
        { type: 'confirm', name: 'useDefault', message: '使用默认配置？', default: true }
    ])

    // 是否启用默认配置项
    if (useDefault) {
        answers = {
            name,
            useDefault,
            ...config.defaultOptions
        }
    } else {
        const { features } = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'features',
                message: '请选择要启用的功能模块(可多选)',
                choices: config.features,
            },
        ])

        const restAnswers = {}
        for (const key of config.options) {
            restAnswers[key] = features.includes(key)
        }

        answers = {
            name,
            useDefault,
            ...restAnswers
        }

        console.log(answers);
    }

    // 添加模块依赖、导入、安装
    const { deps, devDeps, imports, plugins } = resolveDeps(
        answers, config
    )

    console.log('接下来将要安装 dependencies: ', deps, 'devDependencies: ', devDeps)

    const continueAnswer = await inquirer.prompt([
        { type: 'confirm', name: 'continue', message: '是否继续？' }
    ])

    if (!continueAnswer.continue) {
        console.log('流程中止')
    } else {
        // 创建项目
        await createProject(answers, deps, devDeps, imports, plugins)

        // 立即启动
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

// 添加模块依赖、导入、安装
function resolveDeps(answers, config) {
    const deps = []
    const devDeps = []
    const imports = []
    const plugins = []

    for (const [key, value] of Object.entries(answers)) {
        if (value) {
            // 存在相关配置，则添加
            config.dependencies[key]?.forEach(dep => deps.push(dep))
            config.devDependencies[key]?.forEach(dep => devDeps.push(dep))
            config.imports[key] && imports.push(config.imports[key])
            config.plugins[key] && plugins.push(config.plugins[key])
        }
    }

    return { deps, devDeps, imports, plugins }
}

CLI()