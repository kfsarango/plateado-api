const userController = {}
const User = require('../models/User')
const jwt = require('jsonwebtoken')

userController.register = async (req, res) => {
    const user = new User(req.body)
    user.password = await user.encriptpassword(user.password)

    await user.save()


    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    })


    return res.json({auth: true, user, token})
}

userController.auth = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user) {
        return res.status(401).json({auth: false, massaje: 'user no found'})
    } 

    const validPassword = await user.comparePassword(password, user.password)
    if (!validPassword) {
        return res.status(401).json({auth: false, massaje: 'password incorrect'})
    }
 
    const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24
    })

    
    return res.json({auth: true, user, token})

}

userController.logout = (req, res) => {
    jwt.sign({id: req.userId}, process.env.SECRET_KEY, {
        expiresIn: 0
    })

    return res.json({auth: false, messaje: 'user logout'})
}

userController.updatePassword = async (req, res) => {
    const {CurrentPassword, newPassword} = req.body

    const user = await User.findById(req.userId)

    validpassword = await user.comparePassword(CurrentPassword, user.password)

    if (!validpassword) return res.status(401).json({massaje: 'password incorrect'})

    user.password = await user.encriptpassword(newPassword)
    await user.save()

    res.json({massaje: 'password changed successfully'})
}

userController.update = async (req, res) => {
    const {id} = req.params
    const {name, lastname, gender, birthday, email} = req.body

    const user = await User.findById(id)

    user.name = name
    user.lastname = lastname
    user.gender = gender
    user.birthday = birthday
    user.email = email
    await user.save()

    res.json({message: 'successfy', user})
}

userController.getTokenBAccess = async (req, res) => {
    const token = await jwt.sign({check: true}, process.env.SECRET_KEY)
    return res.json({token: token})
}


module.exports = userController
