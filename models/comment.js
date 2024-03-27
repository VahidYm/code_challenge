const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        // To prevent Duplication, We save user id
        likes: [{ 
            type : Schema.Types.ObjectId,
            ref : 'User',
        }],
    } ,
    {
        timestamps: true ,
        toJSON: { virtuals : true },
    }
);

commentSchema.plugin(autoIncrement, { inc_field: 'comment_id' }); // Define comment_id as an auto-increment field

module.exports = mongoose.model('Comment' , commentSchema);