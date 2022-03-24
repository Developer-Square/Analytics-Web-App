/**
 * Gets rid of empty filters
 * @param {Record<string, any>} filters 
 * @returns {Record<string, any>} sanitized filters
 * @example santizeFilters({ role: '', author: 'linus'})
 */
 export const sanitizeFilters = (filters: Record<string, any>): Record<string, any> => {
    let clonedFilters = Object.assign({}, filters);
    for(const property in clonedFilters){
        if(clonedFilters[property] === 0 || clonedFilters[property] === '' || clonedFilters[property] === 'All'){
            delete clonedFilters[property];
        } else if (clonedFilters[property] === 'true') {
            clonedFilters[property] = true;
        } else if (clonedFilters[property] === 'false') {
            clonedFilters[property] = false;
        }
    }
    return clonedFilters;
}