import TranslatorInterface from './interface'
import { TranslatorOptions, Translations } from './types'

class Translator implements TranslatorInterface {
    // Properties

    private _defaultLocale: string|null
    private _fallbackLocale: string
    private _translations: Translations

    // Constructor

    constructor(options?: TranslatorOptions) {
        const defaultLocale = document.querySelector('html').getAttribute('lang') || 'en'

        this.setLocale(options.locale || defaultLocale)
        this.setFallbackLocale(options.fallback || defaultLocale)
        this.setTranslations(options.translations || {})
    }

    // Getters & Setters

    public setLocale(locale: string): this {
        this._defaultLocale = locale

        return this
    }

    public getLocale(): string {
        return this._defaultLocale
    }

    public setFallbackLocale(fallback: string): this {
        this._fallbackLocale = fallback

        return this
    }

    public getFallbackLocale(): string {
        return this._fallbackLocale
    }

    public setTranslations(translations: Translations): this {
        this._translations = translations

        return this
    }

    // Main Methods

    public get(key: string, replacers?: Object): string {
        let translation = key

        if (this.has(key))
            translation = this._getTranslation(this.getLocale(), key);
        else if (this.hasFallback(key))
            translation = this._getTranslation(this.getFallbackLocale(), key);

        return Translator._applyReplacements(translation, replacers || {});
    }

    public has(key: string): boolean {
        return this._hasTranslation(this.getLocale(), key)
    }

    public hasFallback(key: string): boolean {
        return this._hasTranslation(this.getFallbackLocale(), key)
    }

    // Other Methods

    private _getTranslation(locale: string, key: string): any {
        return this._hasTranslation(locale, key)
            ? this._translations[locale][key]
            : key;
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

export {
    TranslatorOptions,
    TranslatorInterface,
    Translations,
}

export default Translator
