/**
 * Filters an array according to a query object
 * @param {Record<string, any>[]} arr array to be filtered
 * @param {Record<string, any>} query object containing filter values
 * @returns {Record<string, any>[]} filtered array
 * @example search(arr, { role: 'editor' })
 */
const search = (arr: Record<string, any>[], query: Record<string, any>): Record<string, any>[] => {
    return arr.filter((item) => {
        for(var key in query){
            if (item[key] === undefined || item[key] !== query[key])
              return false;
        }
        return true;
    })
}

export default search;
