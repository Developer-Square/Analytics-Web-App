import { Db, DeleteResult, Document, WithId, ModifyResult, ObjectId } from 'mongodb';
import Paginate, { IQueryResult } from '../database/paginate';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import pick from '../utilities/pick';
import Recent, { IRecentDocs } from '../database/recent';

class PageVisit {
    db: Db;

    constructor(db: Db){
        this.db = db;
    }

    /**
     * Insert a single page
     * @param {Record<string, any>} pageBody
     * @returns {Promise<WithId<Document> | null>}
     */
    async insertPageVisit(pageBody: Record<string, any>): Promise<WithId<Document> | null>{
        const result = await this.db.collection('pageVisits').insertOne(pageBody);
        return await this.findById(result.insertedId);
    }

    /**
     * Delete a single pageVisit
     * @param {ObjectId} pageVisitId
     * @returns {Promise<DeleteResult>}
     */
    async deletePageVisit(pageVisitId: ObjectId): Promise<DeleteResult>{
        const pageVisit = await this.findById(pageVisitId);
        if(!pageVisit) throw new ApiError(httpStatus.NOT_FOUND, 'PageVisit does not exist');
        return this.db.collection('pageVisits').deleteOne({ "_id":pageVisitId });
    }

    /**
     * This will reset the pageVisits collection by deleting all documents. Use carefully
     * @returns {Promise<DeleteResult>}
     */
    async reset(): Promise<DeleteResult>{
        return this.db.collection('pageVisits').deleteMany({});
    }

    /**
     * Paginates pageVisits
     * @param {IPagination} query pagination filter and options
     * @returns {Promise<IQueryResult>} List of pageVisits that satisfy filter
     */
    async paginate(query: any): Promise<IQueryResult> {
        const filter = pick(query, ['userId', 'anonymousId']);
        const options = pick(query, ['sortBy', 'limit', 'page']);
        const pagination = new Paginate(filter, options, this.db.collection('pageVisits'));
        return await pagination.getDocuments();
    }

    /**
     * Returns page visits whose timestamp is within the last 30 days
     * @param options filter and sorting options
     * @returns {Promise<IRecentDocs>} page visits whose timestamp is within the last 30 days that satisty filter
     */
     async recent(options: any): Promise<IRecentDocs> {
        const filter = pick(options, ['userId', 'anonymousId']);
        const recent = new Recent(this.db.collection('pageVisits'), filter, options.sortBy);
        return await recent.getDocuments();
    }

    /**
     * Find a pageVisit using an id
     * @param pageVisitId pageVisit id
     * @returns {Promise<WithId<Document> | null>} pageVisit
     */
    async findById(pageVisitId: ObjectId): Promise<WithId<Document> | null> {
        return await this.db.collection('pageVisits').findOne({"_id":pageVisitId});
    }

    /**
     * Updates a pageVisit
     * @param pageVisitId 
     * @param updateBody 
     * @returns {Promise<ModifyResult<Document>>} updated document
     */
    async update(pageVisitId: ObjectId, updateBody: Record<string, any>): Promise<ModifyResult<Document>>{
        const pageVisit = await this.findById(pageVisitId);
        if(!pageVisit) throw new ApiError(httpStatus.NOT_FOUND, 'PageVisit does not exist');
        return await this.db.collection('pageVisits').findOneAndUpdate({"_id":pageVisitId}, { $set: updateBody }, { returnDocument: 'after' });
    }
}

export default PageVisit;
