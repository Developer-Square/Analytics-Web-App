import client from '../lib/mongodb';
import { InsertOneResult } from 'mongodb';

/**
 * Insert a user
 * @param {} userBody
 */
export const insertUser = async (userBody: Record<string, any>) => {
    await client?.connect();
    if (client) {
        const db = client.db('analytics-web-app');
        const users = db.collection('users');
        const result: InsertOneResult | undefined = await users?.insertOne(userBody);
        return result;
    }
};
