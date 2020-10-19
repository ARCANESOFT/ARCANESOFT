import Translator from '@arcanesoft/helpers/js/Utilities/Translator'
import translations from '../translations'

const translator = new Translator({
    translations,
})

const getCurrentLocale = (): string => translator.getLocale();

const trans = (key: string, replacers: Object = {}): string => translator.get(key, replacers);

export {
    getCurrentLocale,
    trans,
}

export default {
    methods: {
        getCurrentLocale,
        trans,
    },
}
