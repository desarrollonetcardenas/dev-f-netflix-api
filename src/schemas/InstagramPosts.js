const mongoose =  require('mongoose');

const Schema =  mongoose.Schema

const PostSchema =  new Schema({
    user_id: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [
        {
            user_id: {
                type: String
            },
            user_name:{
                type:String
            }
        }],
    comments: [
        {
            user_id: {
                type: String
            },
            user_comment: {
                type: String
            }
        }
    ]
},{'collection':'instagramposts', 'timestamps': true});

mongoose.Types.ObjectId.prototype.valueOf = function() {
    return this.toString();
}

module.exports =  mongoose.model('instagramposts',PostSchema);
