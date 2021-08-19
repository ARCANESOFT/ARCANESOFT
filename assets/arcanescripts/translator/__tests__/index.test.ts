import Translator, { TranslatorInterface } from '../src'

describe('instance', () => {
    let translations = {
        fr: {},
        es: {},
    }

    let instance: TranslatorInterface

    beforeEach( () => {
        instance = new Translator({
            translations,
        })
    })

    describe('methods', () => {
        //
    })
})
