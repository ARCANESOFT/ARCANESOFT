import formErrors, { ErrorMessages, FormErrors } from '../src'

describe('function', () => {
    it('should import default as a function', () => {
        expect(formErrors).toBeInstanceOf(Function)
    })

    it('should initiate without/empty error messages', () => {
        expect(() => formErrors()).not.toThrowError()
        expect(() => formErrors({})).not.toThrowError()
    })
})

describe('instance', () => {
    let errors: ErrorMessages
    let instance: FormErrors

    beforeEach( () => {
        errors = {
            name: [
                'Name is required',
                'Minimum length is 10 characters',
            ],
            password: [
                'The chosen password is weak',
            ],
        }
        instance = formErrors(errors)
    })

    describe('methods', () => {
        describe('getErrors() / setErrors()', function () {
            it('can access the errors property via a getter', () => {
                expect(instance.getErrors()).toStrictEqual(errors)
            })

            it('can set the errors property', () => {
                instance.setErrors({
                    name: ['The name is required'],
                })
                expect(instance.getErrors()).not.toStrictEqual(errors)
            })
        })

        describe('getFormat() / setFormat()', () => {
            it('should get the default format', () => {
                expect(instance.getFormat()).toStrictEqual(':message')
            })

            it('should set the default format', () => {
                instance.setFormat('Error - :message')

                expect(instance.getFormat()).toStrictEqual('Error - :message')
            })
        })

        describe('count()', () => {
            it('should count the error attributes', function () {
                expect(instance.count()).toStrictEqual(2)
            })
        })

        describe('key()', () => {
            it('should get the error keys', () => {
                expect(instance.keys()).toStrictEqual(['name', 'password'])
            })
        })

        describe('all()', () => {
            it('should get all the messages', () => {
                expect(instance.all()).toStrictEqual({
                    name: [
                        'Name is required',
                        'Minimum length is 10 characters',
                    ],
                    password: [
                        'The chosen password is weak',
                    ],
                })
            })

            it('should get all the messages formatted', () => {
                expect(instance.all('Error - :message')).toStrictEqual({
                    name: [
                        'Error - Name is required',
                        'Error - Minimum length is 10 characters',
                    ],
                    password: [
                        'Error - The chosen password is weak',
                    ],
                })
            })
        })

        describe('add()', () => {
            it('should add a new error message', () => {
                instance.add('email', 'The email is required')

                expect(instance.keys()).toStrictEqual(['name', 'password', 'email'])
                expect(instance.getErrors()).toStrictEqual({
                    ...errors,
                    email: ['The email is required'],
                })
            })

            it('should add a error message to an existing attribute', () => {
                instance.add('password', 'Must contain a special character')

                expect(instance.getErrors()).toStrictEqual({
                    name: [
                        'Name is required',
                        'Minimum length is 10 characters',
                    ],
                    password: [
                        'The chosen password is weak',
                        'Must contain a special character',
                    ],
                })
            })
        })

        describe('get()', () => {
            it('should return empty array if the attribute does not exists', () => {
                expect(instance.get('email')).toStrictEqual([])
            })

            it('should get error messages for a specific attribute', () => {
                expect(instance.get('name')).toStrictEqual([
                    'Name is required',
                    'Minimum length is 10 characters',
                ])

                expect(instance.get('password')).toStrictEqual([
                    'The chosen password is weak',
                ])
            })

            it('should get error messages for a specific attribute with wildcard', () => {
                instance.add('emails.0', 'The [emails.0] field must be a valid email')
                instance.add('emails.1', 'The [emails.1] field must be a valid email')
                instance.add('emails.2', 'The [emails.2] field must be a valid email')

                expect(instance.count()).toStrictEqual(5)

                const actual = instance.get('emails.*')

                expect(Object.keys(actual)).toHaveLength(3)
                expect(actual).toStrictEqual({
                    'emails.0': ['The [emails.0] field must be a valid email'],
                    'emails.1': ['The [emails.1] field must be a valid email'],
                    'emails.2': ['The [emails.2] field must be a valid email'],
                })
            })
        })

        describe('first()', () => {
            it('should get the first error message for a given attribute', () => {
                expect(instance.first('name')).toStrictEqual('Name is required')
                expect(instance.first('password')).toStrictEqual('The chosen password is weak')

                expect(instance.first('email')).toBeNull()
            })

            it('should get first error message for a wildcard attribute', () => {
                instance.add('emails.0', 'The [emails.0] field must be a valid email')
                instance.add('emails.1', 'The [emails.1] field must be a valid email')
                instance.add('emails.2', 'The [emails.2] field must be a valid email')

                expect(instance.first('emails.*')).toStrictEqual('The [emails.0] field must be a valid email')
            })
        })

        describe('has()', () => {
            it('should check if attribute exists by a given key', () => {
                expect(instance.has('name')).toBeTruthy()
                expect(instance.has('password')).toBeTruthy()

                expect(instance.has('email')).toBeFalsy()
            })

            it('should check all attributes exists by multiple keys', () => {
                expect(instance.has(['name', 'password'])).toBeTruthy()

                expect(instance.has(['name', 'email'])).toBeFalsy()
                expect(instance.has(['name', 'password', 'email'])).toBeFalsy()
                expect(instance.has(['email', 'address'])).toBeFalsy()
            })
        })

        describe('hasAny()', () => {
            it('should check if it has any attribute by the given keys', () => {
                expect(instance.hasAny(['name', 'password'])).toBeTruthy()
                expect(instance.hasAny(['email', 'password'])).toBeTruthy()
                expect(instance.hasAny(['email', 'name'])).toBeTruthy()

                expect(instance.hasAny(['email', 'address'])).toBeFalsy()
            })
        })

        describe('merge()', () => {
            it('should merge error messages', () => {
                expect(instance.count()).toStrictEqual(2)

                instance.merge({
                    'email':   ['This must be a valid email'],
                    'address': ['This must be a valid address'],
                })

                expect(instance.count()).toStrictEqual(4)
                expect(instance.all()).toStrictEqual({
                    'name':     ['Name is required', 'Minimum length is 10 characters'],
                    'password': ['The chosen password is weak'],
                    'email':    ['This must be a valid email'],
                    'address':  ['This must be a valid address'],
                })
            })
        })

        describe('reset()', () => {
            it('should reset all the error messages', () => {
                expect(instance.count()).toStrictEqual(2)
                expect(instance.has('name')).toBeTruthy()

                instance.reset()

                expect(instance.count()).toStrictEqual(0)
                expect(instance.has('name')).toBeFalsy()
            })
        })

        describe('isEmpty()', () => {
            it('determine if the error messages is empty', () => {
                expect(instance.isEmpty()).toBeFalsy()

                instance.reset()

                expect(instance.isEmpty()).toBeTruthy()
            })
        })

        describe('isNotEmpty()', () => {
            it('determine if the error messages is not empty', () => {
                expect(instance.isNotEmpty()).toBeTruthy()

                instance.reset()

                expect(instance.isNotEmpty()).toBeFalsy()
            })
        })
    })
})
