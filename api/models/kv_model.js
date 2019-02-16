const { MongoClient } = require('mongodb');
const { MONGO_URL, DB_NAME, COLLECTION_NAME } = require(`../config/${process.env.stage || 'dev'}.json`);

class MongoConnector {
    constructor() { }

    async connector() {
        const conn = new MongoClient(MONGO_URL, { useNewUrlParser: true });
        const client = await conn.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);
        return { client, collection };
    }

    async insert(data) {
        const { client, collection } = await this.connector();
        const { ops: lastInserted } = await collection.insertOne({ ...data, timestamp: new Date() });
        client.close();
        return lastInserted;
    }

    async findByKey(key, timestamp) {
        const { client, collection } = await this.connector();
        const value = await collection.find(
            {
                key, timestamp: { $lte: new Date(timestamp * 1000) }
            },
            {
                sort: {
                    timestamp: -1
                },
                limit: 1
            }).toArray();
        client.close();
        return value;
    }
}

module.exports = new MongoConnector();