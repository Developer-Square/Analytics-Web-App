/**
 * Filters array objects using a date range and filterKey
 * @param {Record<string, any>[]} arr array to be filtered
 * @param {string} finalDate maximum date
 * @param {string} initialDate minimum date
 * @param {string} filterKey Object key used for the filter.
 * @returns {Record<string, any>[]} array filtered using date range
 * @example filterByDateRange(arr, 21-01-31, 21-01-01, 'timestamp')
 */
const filterByDateRange = (arr: Record<string, any>[], finalDate: string, initialDate: string, filterKey: string): Record<string, any>[] => arr.filter(item => new Date(item[filterKey]) <= new Date(finalDate) && new Date(item[filterKey]) >= new Date(initialDate));

/**
 * Filters array objects using a date range and embedded filterKey
 * @param {Record<string, any>[]} arr array to be filtered 
 * @param {number} finalDate maximum date 
 * @param {number} initialDate minimum date 
 * @param {tring} outerField key for the embedded filterKey
 * @param {string} filterKey Object key used for the filter. 
 * @returns {Record<string, any>[]} array filtered using date range
 * @example filterByDateRangeUsingEmbeddedField(arr, 21-01-31, 21-01-01, 'meta', 'timestamp')
 */
export const filterByDateRangeUsingEmbeddedField = (arr: Record<string, any>[], finalDate: number, initialDate: number, outerField: string, filterKey: string): Record<string, any>[] => arr.filter(item => new Date(item[outerField][filterKey]) <= new Date(finalDate) && new Date(item[outerField][filterKey]) >= new Date(initialDate));


export default filterByDateRange;
