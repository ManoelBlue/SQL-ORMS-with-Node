const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;


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
        // console.log(movie.toJSON());

        const movie2 = await Movie.create({
            title: 'The Incredibles',
            runtime: 115,
            releaseDate: '2004-04-14',
            isAvailableOnVHS: true,
        });
        // console.log(movie2.toJSON());

        const person = await Person.create({
            firstName: 'Manoel',
            lastName: 'Blue',
        });
        // console.log(person.toJSON());

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
        // console.log(movie3.toJSON());

        // retrieves a single instance by its primary key (or id)
        const movieById = await Movie.findByPk(1);
        // console.log(movieById.toJSON());

        // finds and retrieves one specific element in a table
        // only the first matching record
        const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
        // console.log(movieByRuntime.toJSON());

        // returns an array with all instances
        // const movies = await Movie.findAll();
        // console.log(movies.map(movie => movie.toJSON()));

        const people = await Person.findAll({
            // can receive multiple porperties
            // like an AND condition
            where: {
                lastName: 'Blue'
            }
        });
        // console.log(people.map(movie => movie.toJSON()));

        const movies = await Movie.findAll({
            attributes: ['id', 'title'], // return only id and title
            where: {
                // isAvailableOnVHS: true,
                title: {
                    [Op.endsWith]: 'story'
                },
                releaseDate: {
                    [Op.gte]: '2004-01-01' // greater than or equal to the date
                },
                runtime: {
                    [Op.gt]: 95, // greater than 95
                    // [Op.between]: [75, 115] // range
                },
            },
            order: [['id', 'DESC']] // IDs in descending order
        });
        // console.log( movies.map(movie => movie.toJSON()) );

        // Updating a row:
        // first find and then update the collumn
        // finally save
        const toyStory3 = await Movie.findByPk(3);
        toyStory3.title = 'Toy Story 3';
        await toyStory3.save();

        // using update method
        // does not require the save method
        // await toyStory3.update({
        //     isAvailableOnVHS: true,
        // });

        // await toyStory3.update({
        //     title: 'Trinket Tale 3',
        //     isAvailableOnVHS: true,
        // }, { fields: ['title', 'isAvailableOnVHS'] }); // specifies which columns should be updated

        // converting an instance or collection of instances to json
        // console.log( toyStory3.get({ plain: true }) );

        //Deleting a row:
        // Find a record
        const toyStory = await Movie.findByPk(1);

        // Delete a record
        await toyStory.destroy();

        const movies2 = await Movie.findAll();
        console.log( movies2.map(movie => movie.toJSON()) );

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