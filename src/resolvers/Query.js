const Movies = require('../schemas/Movies');

function prueba(_, args, context, info) {
    return "Esto es una prueba en graphql";
}

function movies(_, args, context, info) {
    return Movies.find({ is_active: true }).then(
        (movies) => {
            return movies;
        }
    )
    .catch((err) => {
        throw new Error(err)
    });
}

function movie(_, args, context, info) {
    return Movies.findById(args.id).then(
        (movie) => {
            return movie;
        }
    )
    .catch(
        (error) => { throw new Error(error); }
    );
}


module.exports = {
    prueba,
    movie,
    movies
};
