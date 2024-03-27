const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const profileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        enneagram: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
        tritype: {
            type: String, 
            required: true,
        },
        socionics: { 
            type: String,
            required: true,
        },
        sloan: {
            type: String,
            required: true,
        },
        psyche: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
        },
    } ,
    {
        timestamps: true ,
        toJSON: { virtuals : true },
    }
);

profileSchema.plugin(autoIncrement, { inc_field: 'profile_id' }); // Define profile_id as an auto-increment field

module.exports = mongoose.model('Profile' , profileSchema);