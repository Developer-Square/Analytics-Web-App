import { Collection, WithId, Document } from "mongodb";
import addMonths from "../filters/addMonths";

export interface IRecentDocs {
    documents: WithId<Document>[];
    count: number;
}

/**
 * Returns documents whose timestamp is within the last 30 days
 */
export default class Recent {
    dateFilter: Record<string, any>;
    filter: Record<string, any>;
    sort: string;
    collection: Collection;
    count: Promise<number>;
    documents: Promise<WithId<Document>[]>;

    constructor(collection: Collection, filter?: Record<string, any>, sortBy?: string) {
        this.dateFilter = { 'meta.timestamp': { $gt: addMonths(new Date(), -1)}};
        this.filter = this.sanitizeFilter(filter);
        this.sort = this.sanitizeSort(sortBy);
        this.collection = collection;
        this.count = this.countDocs();
        this.documents = this.findDocs();
    }

    /**
     * Cleans up sort input 
     * @param sortBy - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
     * @returns {string} sorting order
     */
    sanitizeSort(sortBy?: string): string {
        if (sortBy) {
            const sortingCriteria: string[] = [];
            sortBy.split(',').forEach((sortOption: string) => {
                const [key, order] = sortOption.split(':');
                sortingCriteria.push((order === 'desc' ? '-' : '') + key);
            });
            return sortingCriteria.join(' ');
        } else {
            return 'createdAt';
        }
    }

    sanitizeFilter(incomingFilter?: Record<string, any>): Record<string, any> {
        if(incomingFilter){
            return { ...this.dateFilter, ...incomingFilter }
        } else {
            return { ...this.dateFilter }
        }
    }

    async countDocs(): Promise<number> {
        return await this.collection.countDocuments(this.filter);
    }

    async findDocs(): Promise<WithId<Document>[]> {
        return await this.collection.find(this.filter).sort(this.sort).toArray();
    }

    async getDocuments(): Promise<IRecentDocs> {
        return Promise.all([this.documents, this.count]).then(values => {
            const [docResult, countResult] = values;
            const result = {
                documents: docResult,
                count: countResult,
            }
            return Promise.resolve(result);
        });
    }
}