import { MongoClient, Db } from 'mongodb'
import config from './config';
import logger from './logger';

const uri = config.mongoose.url;
const options = {}

let client: MongoClient | undefined = undefined
let db: Db | undefined = undefined;
let clientPromise: Promise<MongoClient> | undefined = undefined;
(async function () {
    if (config.env === 'development') {
        if (process.env.NODE_ENV === 'development') {
            // In development mode, use a global variable so that the value
            // is preserved across module reloads caused by HMR (Hot Module Replacement)
            if (!global._mongoClientPromise) {
                client = new MongoClient(uri, options)
                global._mongoClientPromise = client.connect()
            }

            clientPromise = global._mongoClientPromise;
        } else {
            // In production mode, it's best to not use a global variable.
            client = new MongoClient(uri, options)
            clientPromise = client.connect()
        }
        await client?.connect();
        if (client) {
            logger.info('Connected to MongoDB');
            db = client.db('analytics-web-app');
        }
    }
})()

export { clientPromise, client };