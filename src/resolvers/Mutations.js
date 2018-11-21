const Users = require('../schemas/Users');
const createToken = require('../utils/createToken');
const comparePasswords = require('../utils/comparePasswords');

function signup(_, args, context, info) {

    return Users.create( args.data ).then(
        (user) => {
            console.log(user);

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

module.exports = {
    signup,
    login
};
