const mongoose =  require('mongoose');

const Schema =  mongoose.Schema


const MovieSchema =  new Schema({
        name:{
            type:String,
            required:true
        },
        genre:{
            type:String,
            enum:["ACTION","SCIFY","DRAMA","COMEDY","HORROR"],
            required:true
        },
        director:{
            type:String,
            required:true
        },
        cast:[
            {
                name:{
                    type:String
                },
                age:{
                    type:Number
                }
            }
        ],
        sinopsis:{
            type:String,
            required:true
        },
        duration:{
            type:String,
            required:true
        },
        released_date:{
            type:Date,
            required:true
        },
        rating:{
            type:Number,
            default:0
        },
        rate:{
            type:String,
            enum:["A","B","C","B15"],
            required:true
        },
        language:{
            type:String,
            required:true
        },
        cover:{
            type:String,
            required:true
        },
        movie_url:{
            type:String,
            required:true
        },
        is_active:{
            type:Boolean,
            default:true
        }

},{'collection':'movies','timestamps':true});

mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString();
}

module.exports =  mongoose.model('movies',MovieSchema);
