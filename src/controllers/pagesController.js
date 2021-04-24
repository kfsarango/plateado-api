const pagesController = {}
const WebPage = require('../models/WebPage')
const utils = require('../controllers/utils')

pagesController.getWebPages = async (req, res) => {
	const {id} = req.params
	const webPages = await WebPage.find({category: id, display: true})
	return res.json({pages: webPages})
}

pagesController.createWebPage = async (req, res) => {
	const {name, overview, category, route} = req.body
	if (await utils.checkAvailableResource('WebPage', name, route)){
		const mypage = new WebPage({
			name, overview, category, route
			}
		)
		await mypage.save()
		return res.json({message: 'good'})
	} else {
		return res.json({message: 'Name or route not available'})
	}
}

pagesController.updateWebPage = async  (req, res) => {
	const {id} = req.params
	const {name, overview, category, route, display} = req.body
	if (await utils.checkAvailableUpdate('WebPage', name, route, id)) {
		const webPage = await WebPage.findByIdAndUpdate(id, {
			name, overview, category, route, display
		})
		return res.json({message: "good", obj: webPage})
	} else {
		return res.json({message: "Name o route not available."})
	}
}

pagesController.deleteWebPage = async (req, res) => {
	const {id} = req.params
	const webPage = await WebPage.findByIdAndDelete(id)
	return res.json({message: "good", obj: webPage})
}

module.exports = pagesController
