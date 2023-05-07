import { Db, MongoClient } from 'mongodb';
import config from '../config/config';

if (!config.mongodb.url) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  let client = new MongoClient(config.mongodb.url);
  await client.connect();
  let db = client.db(config.mongodb.dbName);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
};

export default connectToDatabase;
