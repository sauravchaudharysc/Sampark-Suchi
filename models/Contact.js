const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    //To create relationship between contact and user
    //Because each user has own set of contacts
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //refer to specific collection users
        ref: 'users'
    },
    name: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true,
    },
    phone: {
        type : String,
    },
    type: {
        type : String,
        default : 'Personal'
    },
    date: {
        type : Date,
        default: Date.now
    },
});

module.exports = mongoose.model('contact',ContactSchema);