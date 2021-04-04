'use strict'

const mongoose = require('mongoose')

mongoose.connect(
	'mongodb://localhost/plateado_api',
	{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(ok => console.log('db connect'))
.catch(err => console.log(err))