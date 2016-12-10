module.exports = (Sequelize, sequelize) => {
    return sequelize.define('COUNTRY', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        COUNTRY_NAME:{
            type:Sequelize.CHAR(30),
        }
    });
};