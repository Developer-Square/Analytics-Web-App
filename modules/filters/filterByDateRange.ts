/**
 * Filters array objects using a date range and filterKey
 * @param {Record<string, any>[]} arr array to be filtered
 * @param {string} finalDate maximum date
 * @param {string} initialDate minimum date
 * @param {string} filterKey Object key used for the filter.
 * @returns {Record<string, any>[]} array filtered using date range
 * @example filterByDateRange(arr, 21-01-31, 21-01-01, 'incidentDate')
 */
const filterByDateRange = (arr: Record<string, any>[], finalDate: string, initialDate: string, filterKey: string): Record<string, any>[] => arr.filter(item => new Date(item[filterKey]) <= new Date(finalDate) && new Date(item[filterKey]) >= new Date(initialDate));

export default filterByDateRange;