import { Arcanesoft } from '../../contracts/arcanesoft'

export const ARCANESOFT_NAME = 'ARCANESOFT'

export default (): Arcanesoft => window[ARCANESOFT_NAME]
