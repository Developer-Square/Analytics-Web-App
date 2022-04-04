/**
 * Groups array of objects according to property
 * @param {Record<string, any>[]} objectArray Array of objects
 * @param {string} property 
 * @returns {Record<string, Record<string, any>[]>} object with property as keys and grouped objects in an array as values
 * @example groupBy(incidents, 'category')
 */
export const groupBy = (objectArray: Record<string, any>[], property: string): Record<string, Record<string, any>[]> => objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
}, {});

/**
 * Groups array of objects according to property and counts the grouped objects
 * @param {Record<string, any>[]} objectArray Array of objects 
 * @param {string} property
 * @returns {Record<string, number>} object with properties as keys and number of grouped objects as values
 * @example groupByAndCount(incidents, 'category')
 */
export const groupByAndCount = (objectArray: Record<string, any>[], property: string): Record<string, number> => {
    const groupedObjects = groupBy(objectArray, property);
    const keys = Object.keys(groupedObjects);
    let countObj: Record<string, number> = {};

    keys.forEach((key, index) => {
        countObj[key] = groupedObjects[key].length;
    })
    return countObj;
}
