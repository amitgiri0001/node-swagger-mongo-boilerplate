'use strict';
const app = require('express')();
const bodyParser = require('body-parser');

const swaggerInit = require('./swagger_init');
const { PORT } = require(`./api/config/${process.env.stage || 'dev'}.json`);

app.get('/', (_, res) => res.sendStatus(200));
app.use(bodyParser.json());

swaggerInit(app, app => {
  app.listen(PORT, (err, r) => {
    if (!err) console.log(`Server started at ${PORT}`);
    else console.log(err);
  })
});

