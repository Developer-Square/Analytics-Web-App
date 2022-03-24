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

export default searchAndSort;
