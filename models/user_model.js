const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    mobile: {
        type: Number,
        required: false,
    },
    
    district:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'District'
    }],
    roles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    }]
});
module.exports = mongoose.model('User', userSchema);
