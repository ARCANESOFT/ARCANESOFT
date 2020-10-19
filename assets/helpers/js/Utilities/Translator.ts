type TranslatorOptions = {
    locale?: string
    fallback?: string
    translations?: Object
}

export default class Translator {
    // Properties

    private _defaultLocale: string|null
    private _fallbackLocale: string
    private _translations: Object

    // Constructor

    constructor(options: TranslatorOptions = {}) {
        this.setLocale(options.locale || document.querySelector('html').getAttribute('lang'))
        this.setFallback(options.fallback || 'en')
        this.setTranslations(options.translations || {})
    }

    // Getters & Setters

    public setLocale(locale: string): Translator {
        this._defaultLocale = locale

        return this
    }

    public getLocale(): string {
        return this._defaultLocale
    }

    public setFallback(fallback: string): Translator {
        this._fallbackLocale = fallback

        return this
    }

    public getFallbackLocale(): string {
        return this._fallbackLocale
    }

    public setTranslations(translations: Object): Translator {
        this._translations = translations

        return this
    }

    // Main Methods

    public get(key: string, replacers: Object = {}) {
        let translation = key

        if (this.has(key))
            translation = this._getTranslation(this.getLocale(), key);
        else if (this.hasFallback(key))
            translation = this._getTranslation(this.getFallbackLocale(), key);

        return Translator._applyReplacements(translation, replacers);
    }

    has(key: string): boolean {
        return this._hasTranslation(this.getLocale(), key)
    }

    hasFallback(key: string) {
        return this._hasTranslation(this.getFallbackLocale(), key)
    }

    private _getTranslation(locale: string, key: string): any {
        if (this._hasTranslation(locale, key))
            return key;

        return this._translations[locale][key];
    }

    private _hasTranslation(locale: string, key: string): boolean {
        let translations = this._translations[locale]

        if (translations === undefined)
            return false

        return translations[key] !== undefined;
    }

    private static _applyReplacements(translation: string, replacers: Object): string {
        for (let replacer in replacers) {
            translation = translation.replace(
                new RegExp(`:${replacer}`, 'g'),
                replacers[replacer]
            )
        }

        return translation
    }
}
