import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

let language = localStorage.getItem('lang')

if (!language){
    language = navigator.language.startsWith('zh') ? 'zh' : 'en'// 自动识别语言
    localStorage.setItem('lang', language)
}

const i18n = createI18n({
    locale: language,
    fallbackLocale: 'en',
    messages: {
        zh,
        en
    }
})

export default i18n