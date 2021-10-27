const dayjs = require("dayjs")

const isEmity = (data) => {
    switch ( Object.prototype.toString.call(data) ) {
        case '[object String]':
            return !data
        case '[object Boolean]':
        case '[object Undefined]':
        case '[object Null]':
            return !data
        case '[object Array]':
            return !data.length
        case '[object Object]':
            return !Object.keys(data).length
        default:
            return false
    }
}

const moodStatusVali = (status) => {
    return [1, 2, 3, '1', '2', '3'].includes(status)
}

const timeVali = (time) => {
    return dayjs(time).isValid()
}

module.exports = { isEmity, moodStatusVali, timeVali }