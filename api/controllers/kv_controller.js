const model = require('../models/kv_model');
const { ObjectId } = require('mongodb');

exports.saveKeyValuePairs = (req, res, next) => {
    (async () => {
        try {
            const [key, value] = Object.entries(req.body)[0];
            let lastInserted = await model.insert({ key, value });
            if (lastInserted.length) {
                lastInserted = lastInserted[0];
                lastInserted.timestamp = ObjectId(lastInserted._id).getTimestamp();
                delete lastInserted._id;
            }
            res.json(lastInserted);
        } catch (error) {
            console.log(error)
        }
    })();
}


exports.getValueByKey = (req, res, next) => {
    (async () => {
        try {
            const data = await model.findByKey(req.swagger.params.key.value, req.swagger.params.timestamp.value);
            res.json(data ? { value: data } : {});
        } catch (error) {
            console.log(error)
        }
    })();
}