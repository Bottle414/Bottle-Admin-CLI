// 选项配置
export default {
    // 选项
    options: [
        'useI18n', 'useCharts', 'usePinia', 'useRouter',
        'useExport', 'useMock', 'useServe', 'useCommit'
    ],

    // 默认配置
    defaultOptions: {
        useI18n: true,
        useCharts: true,
        usePinia: true,
        useRouter: true,
        useExport: true,
        useMock: true,
        useServe: true,
        useCommit: false,
    },

    // 模块安装提示
    features: [
        { name: '🌐 i18n 国际化', value: 'useI18n', checked: true },
        { name: '📊 ECharts 图表', value: 'useCharts' },
        { name: '📦 Pinia 状态管理', value: 'usePinia', checked: true },
        { name: '🧭 Vue-Router 路由', value: 'useRouter', checked: true },
        { name: '📤 表格导出功能', value: 'useExport' },
        { name: '🧪 Mock 数据', value: 'useMock' },
        { name: '🖥️ Node.js 后端', value: 'useServe', checked: true },
        { name: '⚙️ 提交流水线', value: 'useCommit' },
        { name: '--------------- 分隔线 ---------------' }
    ],

    // 模块依赖
    dependencies: {
        useI18n: ['vue-i18n'],
        useCharts: ['echarts'],
        usePinia: ['pinia'],
        useRouter: ['vue-router'],
        useExport: ['xlsx'],
    },

    devDependencies: {
        useMock: ['mockjs', 'vite-plugin-mock']
    },

    // 模块导入语句，替换 main.ts下的 ~imports~
    imports: {
        useI18n: `import i18n from './locales'`,
        useCharts: `import * as echarts from 'echarts'`,
        usePinia: `import pinia from './store'`,
        useRouter: `import router from './router'`,
    },

    // 模块安装语句，替换 main.ts下的 ~plugins~
    plugins: {
        useI18n: `app.use(i18n)`,
        useCharts: `app.config.globalProperties.$echarts = echarts`,
        usePinia: `app.use(pinia)`,
        useRouter: `app.use(router)`,
    },
}
