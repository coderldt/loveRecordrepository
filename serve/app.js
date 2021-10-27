const express = require('express')
const app = express()
const path = require('path')
// const dayjs = require('dayjs')

require('./db') 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/user', require('./routes/userTables'))
app.use('/mood', require('./routes/mood'))
app.use('/record', require('./routes/record'))

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})