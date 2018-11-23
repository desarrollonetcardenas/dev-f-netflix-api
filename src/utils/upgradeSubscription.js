const {SECRET_KEY_STRIPE,SUBSCRIPTION_TYPES} = require('../const');
const stripe =  require('stripe')(SECRET_KEY_STRIPE)



module.exports = (subscription,customer,type) => {
    stripe.subscriptions.create({
        customer,
        items:[
            {
                plan:SUBSCRIPTION_TYPES[type]
            }
        ]
     }, function(err,subs){
         if(err) throw err

         console.log('subscription: ', subscription);


         subscription.stripe_id = subs.id;
         subscription.type_subscription=type;
         subscription.save();
     })


}
