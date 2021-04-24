const express = require('express')
const middleware = require('../middleware')
const router = express.Router()

const userController = require('../controllers/userController')
const categoryController = require('../controllers/categoryController')
const pagesController = require('../controllers/pagesController')
const contentController = require('../controllers/contentController')

// User
router.post('/register', middleware.verifyMail, userController.register)
router.post('/auth', userController.auth)
router.post('/logout', middleware.verifyToken, userController.logout)
router.post('/user/changePassword', middleware.verifyToken, userController.updatePassword)
router.put('/user/update/:id', middleware.verifyToken, userController.update)
router.get('/token-access', middleware.verifyToken, userController.getTokenBAccess)

// Categories
router.get('/categories', middleware.checkAccesToken, categoryController.index)
router.post('/category/create', middleware.verifyToken, categoryController.createCategory)
router.put('/category/update/:id', middleware.verifyToken, categoryController.updateCategory)
router.delete('/category/delete/:id', middleware.verifyToken, categoryController.deleteCategory)


// Pages
router.get('/pages/:id', middleware.checkAccesToken, pagesController.getWebPages)
router.post('/page/create', middleware.verifyToken, pagesController.createWebPage)
router.put('/page/update/:id', middleware.verifyToken, pagesController.updateWebPage)
router.delete('/page/delete/:id', middleware.verifyToken, pagesController.deleteWebPage)

//Content
router.get('/contents/:id', middleware.checkAccesToken, contentController.getContents)
router.post('/content/create', middleware.verifyToken, contentController.createContent)
router.put('/content/update/:id', middleware.verifyToken, contentController.updateContent)
router.delete('/content/delete/:id', middleware.verifyToken, contentController.deleteContent)

module.exports = router

