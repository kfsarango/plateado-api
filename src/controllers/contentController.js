const contentController = {}
const Content = require('../models/Content')

contentController.getContents = async (req, res) => {
	const {id} = req.params
	const contents = await Content.find({page: id})

	return res.json({contents: contents})
}

contentController.createContent = async (req, res) => {
    const {title, type_header, description, order, sections, page} = req.body
    const content = new Content({
    	title, type_header, description, order, sections: [], page
    })

    await content.save()

    return res.json({message: 'good'})
}

contentController.updateContent = async (req, res) => {
	const {id} = req.params
	const {title, type_header, description, order, page} = req.body

	const content = await Content.findByIdAndUpdate(id, {
		title, type_header, description, order, page
	})
	return res.json({message: 'good', obj: content})
}

contentController.deleteContent = async (req, res) => {
	const {id} = req.params
	const content = await Content.findByIdAndDelete(id)
	return res.json({message: 'good', obj: content})
}

module.exports = contentController