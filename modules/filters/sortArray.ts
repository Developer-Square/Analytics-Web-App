/**
 * Sorts array according to object key and sorting order
 * @param {Record<string, any>[]} arr array to be sorted 
 * @param {string} field object key to be used in sorting
 * @param {boolean} ascending sorting order
 * @returns {Record<string, any>[]} sorted Array
 * @example sortArray(arr, 'createdAt', true)
 */
const sortArray = (arr: Record<string, any>[], field: string, ascending: boolean): Record<string, any>[] => arr.sort((a,b) => ascending ? a[field] - b[field] : b[field] - a[field]);

export default sortArray;