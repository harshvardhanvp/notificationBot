const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId : {type : String, required: true, unique: true},
    pincodes : [{type: String, unique: true}],
    Districts : [{type: String, unique: true}]
});


module.exports = mongoose.model('User',UserSchema);

