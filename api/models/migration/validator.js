const { COLLECTION_NAME } = require(`../../config/${process.env.stage || 'dev'}.json`);

module.exports = {
    [COLLECTION_NAME]: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["key", "value", "timestamp"],
                properties: {
                    key: {
                        bsonType: "string",
                        description: "key name"
                    },
                    value: {
                        bsonType: ["string", "binData"],
                        description: "key's value"
                    },
                    timestamp: {
                        bsonType: "date",
                        description: "timestamp"
                    }
                }
            }
        }
    }
}