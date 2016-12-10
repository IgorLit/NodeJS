module.exports = (Sequelize, sequelize) => {
    return sequelize.define('MARK', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        MARK_NAME:{
            type:Sequelize.CHAR(30),
        }
    });
};