const SwaggerExpress = require('swagger-express-mw');

module.exports = (app, cb) => {
    const config = {
        appRoot: __dirname
    };

    SwaggerExpress.create(config, function (err, swaggerExpress) {
        if (err) { throw err; }
        swaggerExpress.register(app);
        cb(app);
    });

}