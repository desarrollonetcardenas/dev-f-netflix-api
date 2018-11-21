const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type:String,
        enum: ["action", "scify", "drama", "comedy", "horror"],
        required: true
    },
    director: {
        type:String,
        require: true
    },
    cast: [{
        name: {
            type:String
        },
        age: {
            type:Number
        }
    }],
    sinopsis: {
        type:String,
        required: true
    },
    duration: {
        type:String,
        required: true
    },
    released_date: {
        type:Date,
        required: true
    },
    rating: {
        type:Number,
        default: 0
    },
    rate:{
        type:String,
        enum: ["A","B","C","B15"]
    },
    language:{
        type:String,
        required:true
    },
    cover: {
        type:String,
        required: true
    },
    movie_url: {
        type:String,
        required: true
    }
},{ 'collection':'movies', timestamps: true });


module.exports = mongoose.model('movies', movieSchema, 'movies');
