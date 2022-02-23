import { MongoClient } from 'mongodb';
import config from './config';

const uri = config.mongoose.url;
const options = {};

let client: MongoClient | undefined = undefined;
let clientPromise: Promise<MongoClient> | undefined = undefined;

if (config.env === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
}

export { clientPromise, client };
