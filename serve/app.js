const express = require('express')
const app = express()
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
app.use(cors())

require('./db') 

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(fileUpload({
    tempFileDir : './upload/img/tem/'
}))

// app.use('/', require('./middle/valiToken'))
app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/upload', express.static(path.resolve(__dirname, 'upload')))
app.use('/api', require('./routes/login'))
app.use('/user', require('./routes/userTables'))
app.use('/mood', require('./routes/mood'))
app.use('/record', require('./routes/record'))
app.use('/note', require('./routes/note'))
app.use('/detail', require('./routes/detail'))
app.use('/photo', require('./routes/photo'))

app.use('/', require('./routes/upload'))

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})