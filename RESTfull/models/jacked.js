module.exports = (Sequelize, sequelize) => {
    return sequelize.define('JACKED_CAR', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        JC_JACKDATE:{
            type:Sequelize.DATEONLY,

        },
        JC_REPORT_DATE:{
            type:Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW
        },
        JC_ADDITIONAL: {
            type:Sequelize.CHAR(100),

        },
        JC_FOUND:{
            type:Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        JC_FOUND_DATE:{
            type:Sequelize.CHAR(12),
        },
        DRIVER_RULES_DATE:{
            type:Sequelize.DATEONLY,

        },
        DRIVER_CATEGORY:{
            type:Sequelize.CHAR(1),

        }
    });
};