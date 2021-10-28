const mongoose = require('mongoose')

const photoSchema = mongoose.Schema({
}, { collection: 'photoGroup' })

const photo = mongoose.model('photoGroup', photoSchema, 'photoGroup')
module.exports = photo