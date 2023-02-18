const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    emailAddress: String,
    phoneNumber: String,
    dob: String,
    role: String
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;