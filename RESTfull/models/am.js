module.exports = (Sequelize, sequelize) => {
    return sequelize.define('AM', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        AM_REG_NUMBER:{
            type:Sequelize.CHAR(8),
            notNull:true
        },
        AM_COLOR:{
            type:Sequelize.CHAR(7),
            notNull:true
        },
        AM_BODY_NUMBER: {
            type:Sequelize.INTEGER,
            notNull:true
        },
        AM_ENGINE_NUMBER:{
            type:Sequelize.INTEGER,
            notNull:true
        },
        AM_TECHPASSPORT_NUMBER:{
            type:Sequelize.INTEGER,
            notNull:true
        },
        AM_BIRTHDATE:{
            type:Sequelize.DATEONLY,
            notNull:true
        },
        AM_REGISTRATION_DATE:{
            type:Sequelize.DATEONLY,
            notNull:true
        }
    });
};