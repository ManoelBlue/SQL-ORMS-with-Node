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
            type: Sequelize.STRING
            // by default 255 length
            // to change: Sequelize.STRING(500)
        },
        runtime: {
            type: Sequelize.INTEGER
        },
        releaseDate: {
            type: Sequelize.DATEONLY
            // Obs.:
            // type DATE => yyyy-mm-dd hh:mm:ss format
            // type DATEONLY => yyyy-mm-dd
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN
        },
    }, { sequelize });

    return Movie;
};