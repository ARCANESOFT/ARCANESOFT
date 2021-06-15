import arcanesoft from '../../../src/helpers/arcanesoft'

describe('arcanesoft', function () {
    it('should export default as a function', () => {
        expect(arcanesoft).toBeInstanceOf(Function)
    })
});
