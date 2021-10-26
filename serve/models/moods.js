const mongoose = require('mongoose')

const moodSchema = mongoose.Schema({
    time: Date,
    status: Number, 
    // 1 开心 2 普通 3 生气
    desc: String
}, { collection: 'moodGroup' })

const mood = mongoose.model('moodGroup', moodSchema, 'moodGroup')
module.exports = mood