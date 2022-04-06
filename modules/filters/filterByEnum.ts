/**
 * Filters array of objects using enum values
 * @param {Record<string, any>[]} arr 
 * @param {any[]} enumValues 
 * @param {string} key name of the field being queried
 * @returns {Record<string, any>[]} filtered values
 */
const filterByEnum = (arr: Record<string, any>[], enumValues: any[], key: string): Record<string, any>[] => {
    if (enumValues.includes('All') || enumValues.length === 0) {
        return arr
    } else {
        return arr.filter((item => enumValues.includes(item[key])));
    }
}

export default filterByEnum;
