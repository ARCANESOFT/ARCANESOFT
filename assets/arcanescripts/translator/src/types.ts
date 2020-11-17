export type Translations = {
    [locale: string]: Object
}

export type TranslatorOptions = {
    locale?: string
    fallback?: string
    translations?: Translations
}
