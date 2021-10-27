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

const regs = [
    /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
    /^(\d{4})\/(0\d{1}|1[0-2])\/(0\d{1}|[12]\d{1}|3[01])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
    /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/,
    /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
    /^[1-9]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/,
    /^[1-9]\d{3} (0[1-9]|1[0-2]) (0[1-9]|[1-2][0-9]|3[0-1])$/,
]
const timeVali = (time) => {
    return regs.some(reg => reg.test(time))
}

const timeRangeVali = (time) => {
    if (time && time.start) {
        if (!regs.some(reg => reg.test(time.start))) {
            return false
        }
    }
    if (time && time.end) {
        if (!regs.some(reg => reg.test(time.end))) {
            return false
        }
    }
    if (time && time.start && time.end) {
        return dayjs(time.end).isAfter(dayjs(time.start))
    }
    return true
}

module.exports = { isEmity, moodStatusVali, timeVali, timeRangeVali }