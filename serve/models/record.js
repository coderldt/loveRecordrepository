const mongoose = require('mongoose')

const recordSchema = mongoose.Schema({
    title: String,
    desc: String, 
    content: String, 
    time: Date,
    daysCount: Number
    // 1 开心 2 普通 3 生气
}, { collection: 'recordGroup' })

const record = mongoose.model('recordGroup', recordSchema, 'recordGroup')
module.exports = record