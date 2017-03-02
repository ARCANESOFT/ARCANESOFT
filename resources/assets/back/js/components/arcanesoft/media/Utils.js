// coerce convert som types of data into another type
export const coerce = {
    // Convert a string to booleam. Otherwise, return the value without modification, so if is not boolean, Vue throw a warning.
    boolean: val => (typeof val === 'string' ? val === '' || val === 'true' ? true : (val === 'false' || val === 'null' || val === 'undefined' ? false : val) : val)
};
