const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const passport = require('passport')
require('./config/db').database()

require('./config/passport')(passport)

const app = express()
app.set('port', process.env.PORT || 3000)

app.use(express.static(path.join(__dirname, './public'), { maxAge: 1 }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(logger('dev'))

app.use('/api', require('./routes'))

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
})


