import Translator from "@arcanesoft/helpers/js/Utilities/Translator"
import translations from "../translations";

const translator = new Translator({translations})

const request = {
    methods: {
        request: (options?: Object): Promise<any> => window['request'](options),
    }
}

const trans = {
    methods: {
        __: (key: string, replacers: any = null) => translator.get(key, replacers)
    }
}

export {request, trans}

export default [
    request,
    trans,
]

