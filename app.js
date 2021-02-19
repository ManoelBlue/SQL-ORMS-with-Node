const db = require('./db');
const { Movie } = db.models;
const { Person } = db.models;

(async () => {
    await db.sequelize.sync({ force: true });

    try {
        // New instance with create method
        // useful for express POST, for ex
        const movie = await Movie.create({
            title: 'Toy Story',
            runtime: 81,
            releaseDate: '1995-11-22',
            isAvailableOnVHS: true,
        });
        console.log(movie.toJSON());

        const movie2 = await Movie.create({
            title: 'The Incredibles',
            runtime: 115,
            releaseDate: '2004-04-14',
            isAvailableOnVHS: true,
        });
        console.log(movie2.toJSON());

        const person = await Person.create({
            firstName: 'Manoel',
            lastName: 'Blue',
        });
        console.log(person.toJSON());

        // New instance: build method only builds it
        // build also gets default values in case not defined
        // creates data in memory, but do not save to the db
        // allows instace modification
        const movie3 = await Movie.build({
            title: 'Toy Story 3',
            runtime: 103,
            releaseDate: '2010-06-18',
            isAvailableOnVHS: false,
        });
        movie3.title = 'Updated Title'; // modifying instance
        await movie3.save(); // save the record
        console.log(movie3.toJSON());

        // retrieves a single instance by its primary key (or id)
        const movieById = await Movie.findByPk(1);
        console.log(movieById.toJSON());

        // finds and retrieves one specific element in a table
        // only the first matching record
        const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
        console.log(movieByRuntime.toJSON());

    } catch (error) {
        // console.error('Error connecting to the database: ', error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
})();