import { clientPromise, client } from '../lib/mongodb';
import { InsertOneResult } from 'mongodb';
import config from '../lib/config';

/**
 * Insert a user
 * @param {} userBody
 */
export const insertUser = async (userBody: Record<string, any>) => {
    Object.assign(userBody, { _id: userBody.userId })
    await clientPromise;
    if (client) {
        const db = client.db(config.mongoose.dbName);
        const users = db.collection('users');
        const result: InsertOneResult | undefined = await users?.insertOne(userBody);
        return result;
    }
};
