const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema( {
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, require: true},
    username: { type: String, required: true, unique: true },
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);