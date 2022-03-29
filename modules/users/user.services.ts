import { Db, DeleteResult, Document, WithId, ModifyResult, InsertManyResult } from 'mongodb';
import Paginate, { IQueryResult } from '../database/paginate';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import pick from '../utilities/pick';
import Recent, { IRecentDocs } from '../database/recent';

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
     * @param {IPagination} query pagination filter and options
     * @returns {Promise<IQueryResult>} List of users that satisfy filter
     */
    async paginate(query: any): Promise<IQueryResult> {
        const filter = pick(query, []);
        const options = pick(query, ['sortBy', 'limit', 'page']);
        const pagination = new Paginate(filter, options, this.db.collection('users'));
        return await pagination.getDocuments();
    }

    /**
     * Returns users whose timestamp is within the last 30 days
     * @param options filter and sorting options
     * @returns {Promise<IRecentDocs>} users whose timestamp is within the last 30 days that satisty filter
     */
     async recent(options: any): Promise<IRecentDocs> {
        const filter = pick(options, []);
        const recent = new Recent(this.db.collection('users'), filter, options.sortBy);
        return await recent.getDocuments();
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

    /**
     * Inserts many users
     * @param {Record<string, any>[]} users list of users
     * @returns {Promise<InsertManyResult<Document>>} 
     */
    async insertUsers(users: Record<string, any>[]): Promise<InsertManyResult<Document>> {
        return await this.db.collection('users').insertMany(users);
    }
}

export default User;
