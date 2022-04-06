const sortWithEmbeddedField = (arr: Record<string, any>[], ascending: boolean, outerField: string, sortKey: string): Record<string, any>[] => arr.sort((a, b) => ascending ? a[outerField][sortKey] - b[outerField][sortKey] : b[outerField][sortKey] - a[outerField][sortKey]);
/**
 * Filters array of objects using enum values and sorts based on a key and sorting order. Uses an embedded field
 * @param {Record<string, any>[]} arr array to be filtered and sorted
 * @param {any[]} enumValues object containing filter values
 * @param {string} key name of the field being queried
 * @param {boolean} ascending sorting order
 * @param {string} outerField key for the embedded field
 * @param {string} sortKey object key to be used in sorting 
 * @returns {Record<string, any>[]} filtered and sorted array
 * @example filterByEnumAndSort(arr, ['login', 'visitPage'], 'event', true, 'meta', 'timestamp')
 */
const filterByEnumAndSort = (arr: Record<string, any>[], enumValues: any[], key: string, ascending: boolean, outerField: string, sortKey: string): Record<string, any>[] => {
    if (enumValues.includes('All') || enumValues.length === 0) {
        return sortWithEmbeddedField(arr, ascending, outerField, sortKey)
    } else {
        const filteredItems = arr.filter((item => enumValues.includes(item[key])))
        return sortWithEmbeddedField(filteredItems, ascending, outerField, sortKey)
    }
}

export default filterByEnumAndSort;
