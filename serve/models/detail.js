const mongoose = require('mongoose')

const detailSchema = mongoose.Schema({
    user: Array,
    detail: Object,
    sign: String
}, { collection: 'detailGroup' })

const detail = mongoose.model('detailGroup', detailSchema, 'detailGroup')
module.exports = detail