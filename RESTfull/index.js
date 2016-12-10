const express = require('express');
const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errors = require('./utils/errors');
const config = require('./config');

const dbcontext = require('./context/db')(Sequelize, config);


const amService = require('./services/am')(dbcontext.am, errors);
const driverService = require('./services/driver')(dbcontext.driver, errors);
const jackedService = require('./services/jacked')(dbcontext.jacked,errors);
const firmService = require('./services/firm')(dbcontext.firm,errors);
const countryService = require('./services/country')(dbcontext.country,errors);
const markService = require('./services/mark')(dbcontext.mark,errors);

const apiController = require('./controllers/api')(amService,driverService,jackedService,firmService,countryService,markService, config);

const app = express();

app.use(express.static('public'));
app.use(cookieParser(config.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', apiController);

dbcontext.sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));