import { Collection } from "mongodb";
import logger from "./logger";

export interface IOptions {
    sortBy: string;
    populate: string;
    limit: number;
    page: number;
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
        this.filter = filter;
        this.sort = this.sanitizeSort(options.sortBy);
        this.limit = this.sanitizelimit(options.limit);
        this.page = this.sanitizePage(options.page);
        this.collection = collection;
        this.count = this.countDocs();
        this.documents = this.findDocs();
    }

    /**
     * Cleans up sort input 
     * @param sortBy - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
     * @returns {string} sorting order
     */
    sanitizeSort(sortBy: string) : string {
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

    sanitizelimit(limit: number) : number {
        return limit && parseInt(limit.toString(), 10) > 0 ? parseInt(limit.toString(), 10) : 10;
    }

    sanitizePage(page: number) : number {
        return page && parseInt(page.toString(), 10) > 0 ? parseInt(page.toString(), 10) : 1;
    }

    async countDocs() : Promise<number> {
        return await this.collection.countDocuments(this.filter);
    }

    async findDocs() {
        return await this.collection.find(this.filter).sort(this.sort).skip((this.page - 1) * this.limit).limit(this.limit).toArray();
    }
};
