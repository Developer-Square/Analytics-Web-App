/**
 * Sorts array according to object key and sorting order. Key must be a date!
 * @param {Record<string, any>[]} arr array to be sorted 
 * @param {string} field object key to be used in sorting - must be a date
 * @param {boolean} ascending sorting order (ascending by default) e.g. { ascending: false } 
 * @returns {Record<string, any>[]} sorted Array
 * @example sortArray(arr, 'createdAt', true)
 */
const sortArrayUsingDate = (arr: Record<string, any>[], field: string, ascending: boolean): Record<string, any>[] => arr.sort((a,b) => ascending ? new Date(a[field]).getTime() - new Date(b[field]).getTime() : new Date(b[field]).getTime() - new Date(a[field]).getTime());

export default sortArrayUsingDate;
