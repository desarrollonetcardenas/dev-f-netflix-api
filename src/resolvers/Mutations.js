const Users = require('../schemas/Users');
const createToken = require('../utils/createToken');
const comparePasswords = require('../utils/comparePasswords');
const Movies = require('../schemas/Movies');
const Subscriptions = require('../schemas/Subscriptions');
const upgradeSub = require('../utils/upgradeSubscription');

const { SECRET_KEY_STRIPE } = require('../const');
const stripe = require('stripe')(SECRET_KEY_STRIPE);

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

function upgradeSubscriptions(_, args, context, info) {
    if( !context.user )
        throw new Error("Authentication is required");

    const { subscription_id, user_payment } = context.user;

    return Subscriptions.findById( subscription_id).then( (subscription) => {
        if( !context.user )
            throw new Error("Authentication is required");

        const { subscription_id, user_payment } = context.user;

        return Subscriptions.findById( subscription_id ).then((subscription) => {
            if( subscription.type_subscription == args.type )
                throw new Error("You cannot upgrade to the same subscription.");

            upgradeSub( subscription, user_payment, args.type );

            return "Subscription upgrade successfully";
        })
        .catch((error) => {
            throw error;
        });
    });
}

/**
 * Agregar una tarjeta de credito en stripe.com a un cliente existente
 */
function addSource(_, args, context, info) {
    if( !context.user )
        throw new Error("Authentication is required.");

    const { user_payment } = context.user;


    return stripe.customers.createSource( user_payment, {
        source: args.source
    }, function( err, customer ) {
        if( err ) throw err;
    });
}

module.exports = {
    signup,
    login,
    createMovie,
    updateMovie,
    deleteMovie,
    upgradeSubscriptions,
    addSource
};
