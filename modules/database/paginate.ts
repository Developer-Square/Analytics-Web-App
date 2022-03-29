import { Collection, WithId, Document, Sort } from "mongodb";

export interface IOptions {
    sortBy?: string;
    limit?: number;
    page?: number;
}

export interface IPagination {
    filter: Record<string, any>;
    options: IOptions;
}

export interface IQueryResult {
    documents: WithId<Document>[];
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
}

/**
 * Returns a paginated list of documents from a collection
 */
export default class Paginate {
    filter: Record<string, any>;
    sort: Sort;
    limit: number;
    page: number;
    collection: Collection;
    count: Promise<number>;
    documents: Promise<WithId<Document>[]>;

    constructor(collection: Collection, filter?: Record<string, any>, options?: IOptions) {
        this.filter = filter ?? {};
        this.sort = this.sanitizeSort(options?.sortBy);
        this.limit = this.sanitizelimit(options?.limit);
        this.page = this.sanitizePage(options?.page);
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

    sanitizelimit(limit?: number): number {
        return limit && parseInt(limit.toString(), 10) > 0 ? parseInt(limit.toString(), 10) : 10;
    }

    sanitizePage(page?: number): number {
        return page && parseInt(page.toString(), 10) > 0 ? parseInt(page.toString(), 10) : 1;
    }

    async countDocs(): Promise<number> {
        return await this.collection.countDocuments(this.filter);
    }

    async findDocs() {
        return await this.collection.find(this.filter).sort(this.sort).skip((this.page - 1) * this.limit).limit(this.limit).toArray();
    }

    async getDocuments(): Promise<IQueryResult> {
        return Promise.all([this.documents, this.count]).then(values => {
            const [docResult, countResult] = values;
            const totalPages = Math.ceil(countResult / this.limit);
            const result = {
                documents: docResult,
                page: this.page,
                limit: this.limit,
                totalPages,
                totalCount: countResult,
            }
            return Promise.resolve(result);
        })
    }
};
