module.exports = (Sequelize, sequelize) => {
    return sequelize.define('FIRM', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        FIRM_NAME:{
            type:Sequelize.CHAR(30),
        }
    });
};