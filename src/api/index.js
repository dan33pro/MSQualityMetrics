const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../../config');
const rate_service = require('./components/rate_service/network.js');
const rate_driver = require('./components/rate_driver/network.js');
const errors = require('../tools/network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
const swaggerDoc = require('./swagger.json');

app.use('/api/rate_service', rate_service);
app.use('/api/rate_driver', rate_driver);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Debe ser el ultimo
app.use(errors);

app.listen(config.msQualityMetrics.port, () => {
    console.log('Api escuchando en el puerto ', config.msQualityMetrics.port);
});