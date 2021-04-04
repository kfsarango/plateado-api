const pagesController = {}

pagesController.helloWorld = async (req, res) => {
	res.json({msg: 'hello world'})
}

module.exports = pagesController