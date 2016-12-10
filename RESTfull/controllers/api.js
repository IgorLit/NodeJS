const express = require('express');

module.exports = (amService,driverService,jackedService,firmService,countryService,markService, config) => {
    const router = express.Router();

    const amController = require('./am')(amService,promiseHandler);
    const driverController = require('./driver')(driverService,promiseHandler);
    const jackedController = require('./jacked')(jackedService,promiseHandler);
    const firmController = require('./firm')(firmService,promiseHandler);
    const countryController = require('./country')(countryService,promiseHandler);
    const markController = require('./country')(markService,promiseHandler);
    router.use('/am',amController);
    router.use('/driver',driverController);
    router.use('/jacked',jackedController);
    router.use('/firm',firmController);
    router.use('/country',countryController);
    router.use('/mark',markController);
    return router;
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}