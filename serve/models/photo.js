const mongoose = require('mongoose')

const photoSchema = mongoose.Schema({
    createTime: Date,
    pics: Array,
    title: String,
    desc: String,
    comment: Array
}, { collection: 'photoGroup' })

photoSchema.statics.findObjOfId = function (id) {
    return new Promise((resolve, reject) => {
        this.findById(id, (err, data) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(data)
        })
    })
}

const photo = mongoose.model('photoGroup', photoSchema, 'photoGroup')
module.exports = photo