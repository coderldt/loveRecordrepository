const mongoose = require('mongoose')

const userTablesSchema = mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    avatarUrl: String,
}, { collection: 'userTables' })

userTablesSchema.statics.findObjOfUsername = function (username, cb) {
    return this.findOne({ username }, (err, data) => {
        if (err) {
            console.log(err);
            return cb({})
        }
        cb(data)
    })
}

userTablesSchema.statics.findObjOfId = function (id, cb) {
    return this.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            return cb({})
        }
        cb(data)
    })
}

userTablesSchema.statics.removeObjOfId = function (id, cb) {
    return this.findByIdAndRemove(id, (err, data) => {
        if (err) {
            console.log(err);
            return cb({})
        }
        cb({ id })
    })
}

const userTable = mongoose.model('userTables', userTablesSchema, 'userTables')

module.exports = userTable