import { MongoClient, Db } from 'mongodb'
import config from './config';
import logger from './logger';

const uri = config.mongoose.url;
const options = {}

let client: MongoClient | undefined = undefined
let db: Db | undefined = undefined;
(async function () {
    if (config.env === 'development') {
        if (process.env.NODE_ENV === 'development') {
            // In development mode, use a global variable so that the value
            // is preserved across module reloads caused by HMR (Hot Module Replacement)
            if (!global._mongoClientPromise) {
                global._mongoClientPromise = new MongoClient(uri, options);
            }

            client = global._mongoClientPromise;
        } else {
            // In production mode, it's best to not use a global variable.
            client = new MongoClient(uri, options)
        }
        await client?.connect();
        if (client) {
            logger.info('Connected to MongoDB');
            db = client.db('analytics-web-app');
        }
    }
})()

export default client;