/**
 * Filters objects using a query object and sorts based on a key and sorting order
 * @param {Record<string, any>[]} arr array to be filtered and sorted
 * @param {Record<string, any>} query object containing filter values
 * @param {boolean} ascending sorting order
 * @param {string} sortKey object key to be used in sorting 
 * @returns {Record<string, any>[]} filtered and sorted array
 * @example searchAndSort(arr, { role: 'editor' }, true, 'createdAt')
 */
const searchAndSort = (arr: Record<string, any>[], query: Record<string, any>, ascending: boolean, sortKey: string): Record<string, any>[] => {
    return arr.filter((item) => {
        for(var key in query){
            if (item[key] === undefined || item[key] !== query[key])
              return false;
          }
          return true;
    }).sort((a,b) => ascending ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);
};

/**
 * Filters objects using a query object and sorts based on a key and sorting order. Uses an embedded field
 * @param {Record<string, any>[]} arr array to be filtered and sorted
 * @param {Record<string, any>} query object containing filter values
 * @param {boolean} ascending sorting order
 * @param {string} outerField key for the embedded field
 * @param {string} sortKey object key to be used in sorting 
 * @returns {Record<string, any>[]} filtered and sorted array
 * @example searchAndSortWithEmbeddedField(arr, { role: 'editor' }, true, 'meta', 'timestamp')
 */
export const searchAndSortWithEmbeddedField = (arr: Record<string, any>[], query: Record<string, any>, ascending: boolean, outerField: string, sortKey: string): Record<string, any>[] => {
    return arr.filter((item) => {
        for(var key in query){
            if (item[key] === undefined || item[key] !== query[key])
              return false;
          }
          return true;
    }).sort((a,b) => ascending ? a[outerField][sortKey] - b[outerField][sortKey] : b[outerField][sortKey] - a[outerField][sortKey]);
};

export default searchAndSort;
