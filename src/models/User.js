const mongoose = require('mongoose')
const schema = mongoose.Schema

const User = new Schema({
	name: {require: true, type: String},
	lastname: {require: true, type: String},
	gender: {require: false, type: String},
	email: {require: true, type: String},
	password: {require: true, type: String}
})

module exports = mongoose.model('Use', User)