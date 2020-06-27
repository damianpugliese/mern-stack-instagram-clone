const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'No image'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Post', PostSchema);