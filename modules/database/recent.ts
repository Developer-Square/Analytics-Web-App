import { Collection, WithId, Document, Sort } from "mongodb";
import addMonths from "../filters/addMonths";

export interface IRecentDocs {
    documents: WithId<Document>[];
    count: number;
}

/**
 * Returns documents whose timestamp is within the last 30 days
 */
export default class Recent {
    filter: Record<string, any>;
    sort: Sort;
    collection: Collection;
    count: Promise<number>;
    documents: Promise<WithId<Document>[]>;

    constructor(collection: Collection, filter?: Record<string, any>, sortBy?: string) {
        this.filter = filter ? { 'meta.timestamp': { $gt: addMonths(new Date(), -1)}, ...filter } : { 'meta.timestamp': { $gt: addMonths(new Date(), -1)}};
        this.sort = this.sanitizeSort(sortBy);
        this.collection = collection;
        this.count = this.countDocs();
        this.documents = this.findDocs();
    }

    /**
     * Cleans up sort input 
     * @param sortBy - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
     * @returns {Sort} sorting order
     */
    sanitizeSort(sortBy?: string): Sort {
        if (sortBy) {
            const sortingCriteria: Sort = {};
            sortBy.split(',').forEach((sortOption: string) => {
                const [key, order] = sortOption.split(':');
                sortingCriteria[key] = order === 'desc' ? -1 : 1;
            });
            return sortingCriteria;
        } else {
            return { 'meta.timestamp': -1 };
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