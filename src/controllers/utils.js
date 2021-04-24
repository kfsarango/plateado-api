const utils = {}
const Category = require('../models/Category')
const WebPage = require('../models/WebPage')
const mongoose = require('mongoose')

utils.checkAvailableResource =  async function (type, name, route) {
    let resource = null;
    if (type === 'Category') {
        resource = await Category.findOne({$or: [{name: name}, {route: route}]})
    } else {
        resource = await WebPage.findOne({$or: [{name: name}, {route: route}]})
    }
    if (resource) {
        return false
    } else {
        return true
    }
}

utils.checkAvailableUpdate =  async function (type, name, route, id) {
    let resources = null;
    if (type === 'Category') {
        resources = await Category.find(
            {$and: [{_id: {$ne: id}},{$or: [{name: name}, {route: route}]}]}
        )
    } else {
        resources = await WebPage.find(
            {$and: [{_id: {$ne: id}},{$or: [{name: name}, {route: route}]}]}
        )
    }
    if (resources.length == 1) {
        return false
    } else {
        return true
    }
}

module.exports= utils