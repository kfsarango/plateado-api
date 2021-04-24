const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema({
	name: {require: true, type: String},
	route: {required: true, type: String},
	enabled: {type: Boolean, default: true}
})

module.exports = mongoose.model('Category', Category)