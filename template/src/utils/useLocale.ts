// 国际化函数
let t = (s: string) => s// 默认无国际化

// 设置使用 i18n 就切换函数
// if (useI18n) {
//     try {
//         const i18n = await import('vue-i18n')
//         t = i18n.useI18n().t
//     } catch (e) {
//         console.warn('i18n load failed:', e)
//     }
// }