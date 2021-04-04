const express = require('express')
const cors = require('cors')

const app = express()

// database
require('../db')

// config
app.set('port', process.env.PORT | 3000)

app.use('/api', require('../routes'))
app.use(express.json())
app.use(cors())


process.env.SECRETE_KEY = 'kimsarivers'

module.exports = app