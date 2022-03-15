import { clientPromise, client } from '../lib/mongodb';
import { InsertOneResult } from 'mongodb';

/**
 * Insert a user
 * @param {} userBody
 */
export const insertUser = async (userBody: Record<string, any>) => {
    await clientPromise;
    if (client) {
        const db = client.db('analytics-web-app');
        const users = db.collection('users');
        const result: InsertOneResult | undefined = await users?.insertOne(userBody);
        return result;
    }
};
