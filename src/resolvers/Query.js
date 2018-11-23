const Movies = require('../schemas/Movies');
const Users = require('../schemas/Users');

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

function me(_, args, context, info) {
    if( !context.user )
        throw new Error( "Authentication is required" );

    return Users.findById( context.user._id )
                .populate("subscription_id")
                .then( (user) => {
                    return user;
                })
                .catch((err) => { throw err; });
}

module.exports = {
    prueba,
    movie,
    movies,
    me
};
