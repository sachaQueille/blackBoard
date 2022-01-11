let mongoose = require('mongoose');

let MessageSchema = mongoose.Schema({
    title: String,
    content: String,
    dateExp: Date,
    read: Boolean,
    sender: String,
});

let TaskSchema = mongoose.Schema({
    name: String,
    category: String,
    owner: String,
    dateInsert: Date,
    dateDue: Date,
    dateCloture: Date,
});

let UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    status: String,
    gender: String,
    dateInsert: Date,
    messages: [MessageSchema],
    tasks: [TaskSchema],
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;