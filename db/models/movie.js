const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        // Set custom primary key column
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            // by default 255 length
            // to change: Sequelize.STRING(500)
            allowNull: false, // disallow null
        },
        runtime: {
            type: Sequelize.INTEGER,
            allowNull: false, // disallow null
        },
        releaseDate: {
            type: Sequelize.DATEONLY,
            // Obs.:
            // type DATE => yyyy-mm-dd hh:mm:ss format
            // type DATEONLY => yyyy-mm-dd
            allowNull: false, // disallow null
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN,
            allowNull: false, // disallow null
            defaultValue: false, // set default value
        },
    }, { sequelize });

    return Movie;
};