import Translator from '@arcanesoft/core/src/helpers/translator'
import translations from '../translations'

const translator = new Translator({
    translations,
})

const getCurrentLocale = (): string => translator.getLocale();

const trans = (key: string, replacers?: Object): string => translator.get(key, replacers);

export {
    getCurrentLocale,
    trans,
}

export default translator
