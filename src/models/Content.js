const mongoose = require('mongoose')
const schema = mongoose.Schema

const Content = new Schema({
	title: {require: true, type: String},
	type_header: {require: true, type: String},
	description: String,
	order: {require: true, type: Number},
	sections: Array
})

module.exports = mongoose.model('Content', Content)