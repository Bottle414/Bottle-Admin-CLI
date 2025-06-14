import inquirer from 'inquirer'
import { createProject } from '../src/createProject.ts'

const answers = await inquirer.prompt([
  { type: 'input', name: 'name', message: '项目名称:' },
  // 名字好像还要转小写
  { type: 'confirm', name: 'useDefault', message: '使用基础配置: 只包含基本界面和路由功能'},
  { type: 'confirm', name: 'useTS', message: '是否使用TS？'},
  { type: 'confirm', name: 'useI18n', message: '是否启用国际化？' },
  { type: 'confirm', name: 'useCharts', message: '是否启用 ECharts？' },
  { type: 'confirm', name: 'useRouter', message: '是否启用动态路由？' },
  { type: 'confirm', name: 'useExport', message: '是否启用表格导出功能？' }
  // 后续还可以继续划分功能模块…… 自选 CI/CD 流水线 (nginx 和 docker)、部署流水线(只需提供网址，本地 cmd 传输)、commit 流水线
  // 是否启用 axios 拦截，启用就把拦截器写进去
  // 是否启用 pinia
])

createProject(answers)// 传入答案，创建模板