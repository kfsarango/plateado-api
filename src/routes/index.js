const express = require('express')
const middleware = require('../middleware')
const router = express.Router()

const userController = require('../controllers/userController')
const pagesController = require('../controllers/pagesController')

router.get('/', pagesController.helloWorld)

router.post('/register', middleware.verifyMail, userController.register)
router.post('/auth', userController.auth)
router.post('/logout', middleware.verifyToken, userController.logout)
router.post('/user/changePassword', middleware.verifyToken, userController.updatePassword)
router.put('/user/update/:id', middleware.verifyToken, userController.update)

module.exports = router

