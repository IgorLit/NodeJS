module.exports = (Sequelize, config) => {

    const sequelize = new Sequelize(config.db.connection_uri);

    const Am = require('../models/am')(Sequelize,sequelize);
    const Driver = require('../models/driver')(Sequelize,sequelize);
    const Jacked = require('../models/jacked')(Sequelize,sequelize);
    const Mark = require('../models/mark')(Sequelize,sequelize);
    const Firm = require('../models/firm')(Sequelize,sequelize);
    const Country = require('../models/country')(Sequelize,sequelize);

    Am.belongsTo(Mark);
    Mark.hasMany(Am);

    Mark.belongsTo(Country);

    Mark.belongsTo(Firm);

    Am.belongsTo(Driver);
    Driver.hasMany(Am);

    Jacked.belongsTo(Am);
  //  Jacked.belongsTo(Am);

    Jacked.belongsTo(Driver);
   // Jacked.belongsTo(Driver);

    return {
        am:Am,
        driver:Driver,
        jacked:Jacked,
        mark:Mark,
        firm:Firm,
        country:Country,
        sequelize: sequelize
    };
};