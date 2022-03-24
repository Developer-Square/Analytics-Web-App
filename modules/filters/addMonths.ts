/**
 * Adds or subtracts months from a given date. Returns date in epoch format
 * @param {Date} initialDate date to be modified
 * @param {number} months number of months to be added or subtracted. subtract dates using a negative number e.g. -3
 * @returns {number} modified date in epoch format
 * @example addMonths(new Date(23-01-2022), -3)
 */
const addMonths = (initialDate: Date, months: number): Date => new Date(initialDate.setMonth(initialDate.getMonth() + months));

export default addMonths;