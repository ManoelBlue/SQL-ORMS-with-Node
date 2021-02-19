const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please provide a value for "firstName"',
                },
                notNull: {
                    msg: 'Please provide a value for "firstName"',
                },
            },
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please provide a value for "lastName"',
                },
                notNull: {
                    msg: 'Please provide a value for "lastName"',
                },
            },
        },
    }, 
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'person',
        tableName: 'my_people_table',
    });

    return Person;
};