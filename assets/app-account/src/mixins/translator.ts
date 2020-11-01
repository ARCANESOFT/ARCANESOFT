import Translator from '@arcanesoft/core/src/helpers/translator'
import translations from '../translations'

const translator = new Translator({ translations })

export default () => {
    const getCurrentLocale = (): string => translator.getLocale();

    const trans = (key: string, replacers?: Object): string => translator.get(key, replacers);

    return {
        translator,
        trans,
        getCurrentLocale,
    }
}
