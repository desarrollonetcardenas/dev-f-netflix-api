const mongoose =  require('mongoose');

const Schema =  mongoose.Schema

const PostsSchema =  new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: [
        {
            user_id: {
                type: Schema.Types.ObjectId
            }
        }],
    comments: [
        {
            user_id: {
                type: Schema.Types.ObjectId
            },
            comment: {
                type: String
            }
        }
    ]
},{'collection':'posts', 'timestamps': true});
