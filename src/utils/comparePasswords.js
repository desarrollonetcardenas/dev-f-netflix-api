const Users = require('../schemas/Users');
const createToken = require('../utils/createToken');

module.exports = (email, password) => {

    return new Promise((resolve, reject) => {

        console.log("email: ", email);


        Users.findOne( { email: email } ).then((user) => {

            console.log( user );

            user.comparePasswords( password, (err, isMatch) => {
                if( isMatch ){
                    resolve( createToken( user ) );
                } else {
                    reject( new Error("Password not match") );
                }
            });
        })
        .catch( (err) => {
            reject( err );
        } );
    });

}
