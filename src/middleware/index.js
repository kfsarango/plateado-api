const middleware = {}
const jwt = require('jsonwebtoken')
const User = require('../models/User')

middleware.verifyToken = async (req, res, next) => {
    const token = req.headers['x-auth-token']
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    } 

    var decode
    
    try {
        decode =  await jwt.verify(token, process.env.SECRET_KEY)
    } catch(e) {
        return res.status(401).json({
            auth: false,
            message: 'token expire or incorrect'
        })
    }
    

    req.userId = decode.id

    const user = await User.findById(req.userId)
    if (!user) {
        return res.json({
            auth: false,
            message: 'No user found'
        })
    }

    req.user = user

    next()

    
}

middleware.verifyMail = async (req, res, next) => {
    const {email} = req.body
    const user = await User.findOne({email})

    if (user) {
        return res.status(401).json({
            auth: false,
            message: 'this email has already been registered'
        })
    }

    next()
}

middleware.checkAccesToken = async (req, res, next) => {
    const token = req.headers['access-token']
    if (!token) {
        return res.status(401).json({
            access: false,
            message: 'No token provided'
        })
    }

    try {
        await jwt.verify(token, process.env.SECRET_KEY)
    } catch(e) {
        return res.status(401).json({
            access: false,
            message: 'token invalid'
        })
    }
    next()
}

module.exports = middleware