import { MongoClient } from 'mongodb';

declare global {
    function someFunction(): string;
    var _mongoClientPromise: Promie<MongoClient>;
}