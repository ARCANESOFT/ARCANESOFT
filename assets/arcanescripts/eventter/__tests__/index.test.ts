import eventter, { EventterInterface } from '../src'

describe('function', () => {
    it('should import default as a function', () => {
        expect(eventter).toBeInstanceOf(Function)
    })

    it('should initiate without/empty handler map', () => {
        expect(() => eventter()).not.toThrowError()
        expect(() => eventter(new Map)).not.toThrowError()
    })

    it('should accept an optional event handler map', () => {
        const map = new Map

        const a = jest.fn()
        const b = jest.fn()

        map.set('foo', [a, b])

        eventter(map).emit('foo')

        expect(a).toBeCalledTimes(1)
        expect(b).toBeCalledTimes(1)
    })
})

describe('instance', () => {
    let events
    let instance: EventterInterface

    beforeEach( () => {
        events = new Map()
        instance = eventter(events)
    })

    describe('properties', () => {
        it('should expose the event handler map', () => {
            expect(instance).toHaveProperty('events')
            expect(instance.events).toBeInstanceOf(Map)
        })
    })

    describe('methods', () => {
        describe('on()', () => {
            it('should be a function', () => {
                expect(instance).toHaveProperty('on')
                expect(instance.on).toBeInstanceOf(Function)
            })

            it('should register handler for new type', () => {
                const listener = jest.fn()

                instance.on('foo', listener)

                expect(events.get('foo')).toStrictEqual([listener])
            })

            it('should register handlers for any type strings', () => {
                const listener = jest.fn()

                instance.on('constructor', listener)

                expect(events.get('constructor')).toStrictEqual([listener])
            })

            it('should append handler for existing type', () => {
                const listenerOne = jest.fn()
                const listenerTwo = jest.fn()

                instance.on('foo', listenerOne)
                instance.on('foo', listenerTwo)

                expect(events.get('foo')).toStrictEqual([listenerOne, listenerTwo])
            })

            it('can chain the call', () => {
                const listenerOne = jest.fn()
                const listenerTwo = jest.fn()

                instance.on('foo', listenerOne)
                instance.on('foo', listenerTwo)

                expect(events.get('foo')).toStrictEqual([listenerOne, listenerTwo])
            })

            it('should NOT normalize case', () => {
                const listener = jest.fn()

                instance.on('FOO', listener)
                instance.on('Bar', listener)
                instance.on('baz:baT!', listener)

                expect(events.get('FOO')).toStrictEqual([listener])
                expect(events.has('foo')).toStrictEqual(false)
                expect(events.get('Bar')).toStrictEqual([listener])
                expect(events.has('bar')).toStrictEqual(false)
                expect(events.get('baz:baT!')).toStrictEqual([listener])
            })

            it('can take symbols for event types', () => {
                const listener = jest.fn()
                const eventType = Symbol('eventType')

                instance.on(eventType, listener)

                expect(events.get(eventType)).toStrictEqual([listener])
            })

            it('should add duplicate listeners', () => {
                const listener = jest.fn()

                instance.on('foo', listener)
                instance.on('foo', listener)

                expect(events.get('foo')).toStrictEqual([listener, listener])
            })
        })

        describe('off()', () => {
            it('should be a function', () => {
                expect(instance).toHaveProperty('off')
                expect(instance.off).toBeInstanceOf(Function)
            })

            it('should remove handler for type', () => {
                const listener = jest.fn()

                instance.on('foo', listener)
                instance.off('foo', listener)

                expect(events.get('foo')).toStrictEqual([])
            })

            it('should NOT normalize case', () => {
                const listener = () => {}

                instance.on('FOO', listener)
                instance.on('Bar', listener)
                instance.on('baz:bat!', listener)

                instance.off('FOO', listener)
                instance.off('Bar', listener)
                instance.off('baz:baT!', listener)

                expect(events.get('FOO')).toStrictEqual([])
                expect(events.has('foo')).toBeFalsy()
                expect(events.get('Bar')).toStrictEqual([])
                expect(events.has('bar')).toBeFalsy()

                expect(events.has('baz:bat!')).toBeTruthy()
                expect(events.get('baz:bat!')).toStrictEqual([listener])
            })

            it('should remove only the first matching listener', () => {
                const listener = jest.fn()

                instance.on('foo', listener)
                instance.on('foo', listener)
                instance.off('foo', listener)

                expect(events.get('foo')).toStrictEqual([listener])

                instance.off('foo', listener)

                expect(events.get('foo')).toStrictEqual([])
            })
        })

        describe('emit()', () => {
            it('should be a function', () => {
                expect(instance).toHaveProperty('emit')
                expect(instance.emit).toBeInstanceOf(Function)
            })

            it('should invoke handler for type', () => {
                const event = {a: 'b'}

                instance.on('foo', (one, two?) => {
                    expect(one).toStrictEqual(event)
                    expect(two).toBeUndefined()
                })

                instance.emit('foo', event)
            })

            it('should NOT ignore case', () => {
                const onFoo = jest.fn()
                const onFOO = jest.fn()

                instance.on('Foo', onFoo)
                instance.on('FOO', onFOO)

                instance.emit('Foo', 'Foo arg')
                instance.emit('FOO', 'FOO arg')

                expect(onFoo).nthCalledWith(1, 'Foo arg')
                expect(onFOO).nthCalledWith(1, 'FOO arg')
            })

            it('should invoke * handlers', () => {
                const all = jest.fn()

                const ea = { a: 'a' }
                const eb = { b: 'b' }

                instance.on('*', all)

                instance.emit('foo', ea)

                expect(all).nthCalledWith(1, 'foo', ea)

                all.mockReset()

                instance.emit('bar', eb)

                expect(all).nthCalledWith(1, 'bar', eb)
            })
        })

        describe('once()', () => {
            it('should be a function', () => {
                expect(instance).toHaveProperty('once')
                expect(instance.emit).toBeInstanceOf(Function)
            })

            it('should invoke once', () => {
                let onFoo = jest.fn()
                let onBar = jest.fn()

                instance.on('foo', onFoo)
                instance.once('bar', onBar)

                let args = {a: 'b'}

                Array.from(['foo', 'bar']).map((type) => {
                    instance.emit(type, args)
                    instance.emit(type, args)
                    instance.emit(type, args)
                })

                expect(onFoo).nthCalledWith(3, args)
                expect(onBar).nthCalledWith(1, args)
            })
        })
    })
})
