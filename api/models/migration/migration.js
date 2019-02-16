const { MongoClient } = require('mongodb');
const { MONGO_URL, DB_NAME, COLLECTION_NAME } = require(`../../config/${process.env.stage || 'dev'}.json`);
const validator = require('./validator');

(async () => {
    const db = await MongoClient.connect(`${MONGO_URL}`, { useNewUrlParser: true }).catch(err => new Error(err));
    if (!(db instanceof Error)) {
        const response = await db.db(DB_NAME).createCollection(COLLECTION_NAME, validator[COLLECTION_NAME]).catch(err => new Error(err));
        db.close();
        console.log("Collection created!", !(response instanceof Error));
    }
    else {
        console.log("Some Error", db instanceof Error);
    }
})()

