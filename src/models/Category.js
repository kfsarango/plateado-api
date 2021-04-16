const mongoose = require('mongoose')
const schema = mongoose.Schema

const Category = new Schema({
	name: {require: true, type: String},
	enabled: {type: Boolean, default: true},
	pages: {type: Array}
})

module exports = mongoose.model('Category', Category)