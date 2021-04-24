const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WebPage = new Schema({
	name: {type: String, require: true},
	overview: {type: String, require: false},
	category: {type: Schema.ObjectId, require: true},
	route: {type: String, require: true},
	display: {type: Boolean, default: true, require: true}
})

module.exports = mongoose.model('WebPage', WebPage)