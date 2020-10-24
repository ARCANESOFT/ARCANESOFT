/**
 * @jest-environment jsdom
 */
import DirectiveExtractor from '../../../../../js/vue/components/wire/dom/directive-extractor'
import tap from '@arcanesoft/core/src/functions/tap'

it('can extract directives from a DOM element', () => {
    const anchor = tap(document.createElement('a'), (elt) => {
        elt.setAttribute('arc:click.prevent', 'helloWorld')
    })

    const extractor = new DirectiveExtractor(anchor)

    expect(extractor.directives()).toHaveLength(1)
    expect(extractor.isEmpty()).toBeFalsy()
    expect(extractor.isNotEmpty()).toBeTruthy()
    expect(extractor.has('click')).toBeTruthy()
    expect(extractor.missing('click')).toBeFalsy()
    expect(extractor.has('enter')).toBeFalsy()
    expect(extractor.missing('enter')).toBeTruthy()

    const directive = extractor.get('click')

    expect(directive.type).toBe('click')
    expect(directive.modifiers).toStrictEqual(['prevent'])
    expect(directive.hasModifier('prevent')).toBeTruthy()
})

it('can extract method and parameters from a directive', () => {
    const input = tap(document.createElement('input'), (elt) => {
        elt.setAttribute('arc:keydown.enter.prevent', 'enterPressed("start", "new game")')
    })

    const extractor = new DirectiveExtractor(input)

    expect(extractor.directives()).toHaveLength(1)

    const directive = extractor.get('keydown')

    expect(directive.type).toBe('keydown')
    expect(directive.modifiers).toStrictEqual(['enter', 'prevent'])
    expect(directive.method).toStrictEqual('enterPressed')
    expect(directive.params).toStrictEqual(['start', 'new game'])
})
