const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db'
});

// Movie model
class Movie extends Sequelize.Model {}
Movie.init();

//async IIFE
(async () => {
    try {
        // returns a promise that resolves to a successful,
        // authenticated connection to the database:
        await sequelize.authenticate();
        console.log('Connection to the database successful!');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
}) ();