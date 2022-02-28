import { Collection, WithId, Document } from "mongodb";

export interface IOptions {
    sortBy?: string;
    limit?: number;
    page?: number;
}

export interface IPagination {
    filter: Record<string, any>;
    options:IOptions;
}

export interface IQueryResult {
    documents: WithId<Document>[];
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
}

export default class Paginate {
    filter: Record<string, any>;
    sort: string;
    limit: number;
    page: number;
    collection: Collection;
    count: Promise<number>;
    documents;

    constructor(filter: Record<string, any>, options: IOptions, collection: Collection){
        this.filter = filter ? filter : {};
        this.sort = options ? this.sanitizeSort(options.sortBy) : 'createdAt';
        this.limit = options ? this.sanitizelimit(options.limit) : 10;
        this.page = options ? this.sanitizePage(options.page) : 1;
        this.collection = collection;
        this.count = this.countDocs();
        this.documents = this.findDocs();
    }

    /**
     * Cleans up sort input 
     * @param sortBy - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
     * @returns {string} sorting order
     */
    sanitizeSort(sortBy: string | undefined) : string {
        if (sortBy) {
            const sortingCriteria: any = [];
            sortBy.split(',').forEach((sortOption: string) => {
            const [key, order] = sortOption.split(':');
            sortingCriteria.push((order === 'desc' ? '-' : '') + key);
            });
            return sortingCriteria.join(' ');
        } else {
            return 'createdAt';
        }
    }

    sanitizelimit(limit: number | undefined) : number {
        return limit && parseInt(limit.toString(), 10) > 0 ? parseInt(limit.toString(), 10) : 10;
    }

    sanitizePage(page: number | undefined) : number {
        return page && parseInt(page.toString(), 10) > 0 ? parseInt(page.toString(), 10) : 1;
    }

    async countDocs() : Promise<number> {
        return await this.collection.countDocuments(this.filter);
    }

    async findDocs() {
        return await this.collection.find(this.filter).sort(this.sort).skip((this.page - 1) * this.limit).limit(this.limit).toArray();
    }

    async getDocuments(): Promise<IQueryResult> {
        return Promise.all([this.documents, this.count]).then(values => {
            const [docResult, countResult] = values;
            const totalPages = Math.ceil(countResult/this.limit);
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
