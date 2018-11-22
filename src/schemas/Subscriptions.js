const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    type_subscription: {
        type:String,
        enum:["basic","gold","premium"],
        required: true
    },
    price: {
        type:Number,
        enum:["0", "19", "99"],
        required: true
    },
    start_date: {
        type:Date,
        required: true
    },
    end_date: {
        type:Date,
        required: true
    },
    is_active: {
        type:Boolean,
        default: false
    },
    stripe_id: {
        type: String
    }
},{ 'collection':'subscriptions', 'timestamps': true });


subscriptionSchema.methods.upgrade = function(type, customer, callback) {

}

module.exports = mongoose.model('subscriptions', subscriptionSchema);
