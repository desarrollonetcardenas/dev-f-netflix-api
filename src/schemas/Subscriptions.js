const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    type_subscription: {
        type:String,
        enum:["basic","normal","premium"],
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
    }
},{ 'collection':'subscriptions', 'timestamps': true });


module.exports = mongoose.model('subscriptions', subscriptionSchema);
