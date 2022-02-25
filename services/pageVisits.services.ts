import { Db, DeleteResult, Document, WithId, ModifyResult, ObjectId } from 'mongodb';
import Paginate, { IPagination } from '../lib/paginate';
import ApiError from '../lib/ApiError';
import httpStatus from 'http-status';

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
     * @param {IPagination} paginationbody pagination filter and options
     * @returns {Promise<WithId<Document>[]>} List of pageVisits that satisfy filter
     */
    async paginate(paginationbody: IPagination): Promise<WithId<Document>[]> {
        const pagination = new Paginate(paginationbody.filter, paginationbody.options, this.db.collection('pageVisits'));
        return await pagination.findDocs();
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
