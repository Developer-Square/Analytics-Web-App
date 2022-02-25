import { Db, DeleteResult, Document, WithId, ModifyResult } from 'mongodb';
import Paginate, { IPagination } from '../lib/paginate';
import ApiError from '../lib/ApiError';
import httpStatus from 'http-status';

class User {
    db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    /**
     * Insert a single user
     * @param {Record<string, any>} userBody
     * @returns {Promise<WithId<Document> | null>}
     */
    async insertUser(userBody: Record<string, any>): Promise<WithId<Document> | null> {
        const user = await this.findById(userBody['userId']);
        if (user) throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
        delete Object.assign(userBody, { ['_id']: userBody['userId'] })['userId'];
        await this.db.collection('users').insertOne(userBody);
        return await this.findById(userBody['_id']);
    }

    /**
     * Delete a single user
     * @param {string} userId
     * @returns {Promise<DeleteResult>}
     */
    async deleteUser(userId: string): Promise<DeleteResult> {
        const user = await this.findById(userId);
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
        return await this.db.collection('users').deleteOne({ "_id": userId });
    }

    /**
     * This will reset the users collection by deleting all documents. Use carefully
     * @returns {Promise<DeleteResult>}
     */
    async reset(): Promise<DeleteResult> {
        return await this.db.collection('users').deleteMany({});
    }

    /**
     * Paginates users
     * @param {IPagination} paginationbody pagination filter and options
     * @returns {Promise<WithId<Document>[]>} List of users that satisfy filter
     */
    async paginate(paginationbody: IPagination): Promise<WithId<Document>[]> {
        const pagination = new Paginate(paginationbody.filter, paginationbody.options, this.db.collection('users'));
        return await pagination.findDocs();
    }

    /**
     * Find a user using an id
     * @param {string} userId user id
     * @returns {Promise<WithId<Document> | null>} user
     */
    async findById(userId: string): Promise<WithId<Document> | null> {
        return await this.db.collection('users').findOne({ "_id": userId })
    }

    /**
     * Updates a user
     * @param {string} userId 
     * @param updateBody 
     * @returns {Promise<ModifyResult<Document>>} updated document
     */
    async update(userId: string, updateBody: Record<string, any>): Promise<ModifyResult<Document>> {
        const user = await this.findById(userId);
        if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
        return await this.db.collection('users').findOneAndUpdate({ "_id": userId }, { $set: updateBody }, { returnDocument: 'after' })
    }
}

export default User;
