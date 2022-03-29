/**
 * Filter a list according to pagination criteria
 * @param {Record<string, any>[]} list
 * @param {number} currentPage
 * @param {number} numberOfItemsPerPage
 * @returns {Record<string, any>[]} filtered list
 * @example paginateList(categories, 2, 10 })
 */
const paginateList = (list: Record<string, any>[], currentPage: number, numberOfItemsPerPage: number): Record<string, any>[] => {
    const start = (currentPage - 1) * numberOfItemsPerPage;
    const end = start + numberOfItemsPerPage;
    return list.slice(start, end);
}

export default paginateList;
