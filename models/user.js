const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        comments:[{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    } ,
    {
        timestamps: true ,
        toJSON: { virtuals : true },
    }
);

userSchema.plugin(autoIncrement, { inc_field: 'user_id' }); // Define user_id as an auto-increment field

module.exports = mongoose.model('User' , userSchema);