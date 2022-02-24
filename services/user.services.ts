import { clientPromise, client } from '../lib/mongodb';
import { Db, DeleteResult, MongoClient, InsertOneResult, Document } from 'mongodb';
import config from '../lib/config';
import Paginate from '../lib/paginate';

export class User {
    client: MongoClient;
    db: Db;

    constructor(client: MongoClient | undefined) {
        if (!client) throw new Error('MongoDB connection is lost. This could be because you refreshed the server by editing code. Close the server and start again');
        this.client = client;
        this.db = client.db(config.mongoose.dbName);
    }

    /**
     * Ensures the client is defined i.e. not undefined
     * @returns
     */
    static async build() {
        await clientPromise;
        return new User(client)
    }

    /**
     * Insert as single user
     * @returns {Promise<InsertOneResult<Document>>}
     */
    async insertUser(userBody: Record<string, any>) {
        delete Object.assign(userBody, { ['_id']: userBody['userId'] })['userId'];
        return this.db.collection('users').insertOne(userBody);
    }

    /**
     * Delete a single user
     * @returns {Promise<DeleteResult>}
     */
    async deleteUser(userId: string): Promise<DeleteResult> {
        return this.db.collection('users').deleteOne({ "_id": userId });
    }

    /**
     * This will reset the users collection by deleting all documents. Use carefully
     * @returns {Promise<DeleteResult>}
     */
    async reset(): Promise<DeleteResult> {
        return this.db.collection('users').deleteMany({});
    }

    /**
     * Paginates users
     * @param paginationbody pagination filter and options
     */
    async paginate(paginationbody: Record<string, any>) {
        const pagination = new Paginate(paginationbody.filter, paginationbody.options, this.db.collection('users'));
        return await pagination.findDocs();
    }

    /**
     * Find a user using an id
     * @param userId user id
     */
    async findById(userId: string) {
        return await this.db.collection('users').findOne({ "_id": userId })
    }

    /**
     * Updates a user
     * @param userId 
     * @param updateBody 
     */
    async update(userId: string, updateBody: Record<string, any>) {
        return await this.db.collection('users').findOneAndReplace({ "_id": userId }, updateBody, { returnDocument: 'after' })
    }
}

