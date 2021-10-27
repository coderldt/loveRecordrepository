const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: String,
    desc: String,
    richTextContent: String,
    createTime: Date,
    expectTime: Date,
}, { collection: 'noteGroup' })

const note = mongoose.model('noteGroup', noteSchema, 'noteGroup')
module.exports = note