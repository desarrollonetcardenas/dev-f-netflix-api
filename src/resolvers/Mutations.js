const Users = require('../schemas/Users');
const createToken = require('../utils/createToken');
const comparePasswords = require('../utils/comparePasswords');
const Movies = require('../schemas/Movies');

function signup(_, args, context, info) {

    return Users.create( args.data ).then(
        (user) => {
            let token = createToken( user );
            return { token };
        },
        (err) => {
            console.log(err);

            if ( err ) return err;
        }
    )
    .catch(
        (err) => {
            throw new Error( err );
        }
    );
}


function login( _, args, context, info ){
    return comparePasswords( args.email, args.password ).then(
        (token) => { return { token } }
    )
    .catch(
        (error) => {
            throw new Error(error);
        }
    );
}

function createMovie(_, args, context, info) {

    return Movies.create( args.data ).then(
        (movie) => {
            console.log('Movie created with id: ', movie._id);
            return movie;
        },
        (err) => {
            throw new Error( err );
        }
    );
}

function updateMovie(_, args, context, info) {
    return Movies.findByIdAndUpdate(args.id, { $set: args.data }, { new: true } ).then(
        (movie) => {
            return movie;
        }
    )
    .catch(
        (error) => {
            throw new Error( error );
        }
    );
}


function deleteMovie(_, args, context, info) {
    return Movies.findOneAndUpdate({ _id: args.id }, { $set: {is_active: false} }).then(
        (movie) => {
            return "Movies deleted";
        }
    )
    .catch((error) => {
        throw new Error( error );
    });
}

module.exports = {
    signup,
    login,
    createMovie,
    updateMovie,
    deleteMovie
};