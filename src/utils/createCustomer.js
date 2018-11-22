const {SECRET_KEY_STRIPE} = require('../const');
const stripe = require('stripe')(SECRET_KEY_STRIPE);

module.exports = (email) => {
    return new Promise((resolve, reject) => {
        stripe.customers.create( {email}, function( err, customer ) {
            if( err ) return reject(err);
            resolve( customer );
        });
    });
}
