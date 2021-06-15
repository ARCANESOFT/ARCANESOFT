export default interface Translator {
    setLocale(locale: string): Translator

    getLocale(): string

    setFallbackLocale(fallback: string): Translator

    getFallbackLocale(): string

    setTranslations(translations: Object): Translator

    get(key: string, replacers: Object): string

    has(key: string): boolean

    hasFallback(key: string): boolean
}
