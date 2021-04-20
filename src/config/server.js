const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// database
require('../db')
console.log(process.env.PORT)
// config
app.set('port', process.env.PORT | 3000)

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use('/api', require('../routes'))

module.exports = app