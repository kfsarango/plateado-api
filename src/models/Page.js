const mongoose = require('mongoose')
const schema = mongoose.Schema

const Page = new Schema({
	name: {require: true, type: String},
	display: {type: Boolean, default: true},
	overview: {type: String}
})

module exports = mongoose.model('Page', Page)