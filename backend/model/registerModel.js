const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const registerSchema = new Schema({
    fname: { type: String },
    lname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profileImg: { type: String }
})

const RegisterModel = mongoose.model('register', registerSchema)

module.exports = RegisterModel;