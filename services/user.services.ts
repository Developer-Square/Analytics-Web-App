import { clientPromise, client } from '../lib/mongodb';
import { MongoClient } from 'mongodb';
import config from '../lib/config';

export class User {
    client: MongoClient;

    constructor(client: MongoClient | undefined){
        if (!client) throw new Error('Cannot be called directly');
        this.client = client;
    }

    static async build () {
        await clientPromise;
        return new User(client)
    }

    async insertUser(userBody: Record<string, any>){
        Object.assign(userBody, { _id: userBody.userId })
        const db = this.client.db(config.mongoose.dbName);
        return db.collection('users').insertOne(userBody);
    }
}
