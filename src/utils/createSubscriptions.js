const Subscriptions = require('../schemas/Subscriptions');


Date.prototype.addDays= function( days ){
    let date = new Date( this.valueOf() );
    date.setDate( date.getDate() + days );

    return date;
}

module.exports = () => {
    const subscription = {
        type_subscription: "basic",
        price: "0",
        start_date: new Date(),
        end_date: new Date().addDays(30),
        is_active: true
    }

    return Subscriptions.create(subscription);
}
