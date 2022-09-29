const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username : String,
    password: String,
    user_type: {
        type: String,
        default: "user"
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User