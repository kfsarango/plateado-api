const categoryController = {}
const Category = require('../models/Category')
const utils = require('../controllers/utils')

categoryController.index = async (req, res) => {
    const categories = await Category.find({enabled: true})
    return res.json({categories: categories})
}


categoryController.createCategory = async (req, res) => {
    const {name, route} = req.body
    if (await utils.checkAvailableResource('Category', name, route)) {
        const myCategory = new Category({name, route})
        await myCategory.save()
        return res.json({message: 'good'})
    } else {
        return res.json({message: 'Name o route not available.'})
    }

}
categoryController.updateCategory = async (req, res) => {
    const {id} = req.params
    const {name, route, enabled} = req.body

    if (await utils.checkAvailableUpdate('Category', name, route, id)) {
        const category = await Category.findByIdAndUpdate(id, {
            name, route, enabled
        })
        return res.json({message: 'good', obj: category})
    } else {
        return res.json({message: 'Name o route not available.'})
    }
}

categoryController.deleteCategory = async (req, res) => {
    const {id} = req.params
    const category = await Category.findByIdAndDelete(id)
    return res.json({message: 'good', obj: category})
}

module.exports = categoryController