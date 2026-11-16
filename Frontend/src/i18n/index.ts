import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import ro from './ro.json'

const resources = {
    en: { translation: en },
    ro: { translation: ro },
}

function resolveLanguage(): string {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')?.toLowerCase()

    if (fromUrl) {
        localStorage.setItem('lang', fromUrl)
        return fromUrl
    }

    return localStorage.getItem('lang') ?? 'ro'
}

i18n.use(initReactI18next).init({
    resources,
    lng: resolveLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
})

export default i18n
