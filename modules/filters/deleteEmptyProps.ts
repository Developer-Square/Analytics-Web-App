/**
 * Deletes properties with empty(or zero) values from an object
 * @param {Record<string, any>} obj object to be filtered
 * @returns {Record<string, any>} filtered object
 * @example deleteEmptyProps({ name: '', role: '', score: 0, category: 'food' })
 */
const deleteEmptyProps = (obj: Record<string, any>): Record<string, any> => Object.fromEntries(Object.entries(obj).filter(([key, val]) => val !== '' || val !== 0 || val !== 'All'));

export default deleteEmptyProps;
