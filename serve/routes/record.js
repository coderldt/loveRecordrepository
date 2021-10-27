const express = require('express')
const router = express.Router()
const { isEmity, moodStatusVali, timeVali } = require('../validator/index')
const dayjs = require('dayjs')

const record = require('../models/record')

router.post('/create', (req, res) => {
    const { title, desc, content } = req.body
    if (isEmity(title)) {
        return res.send({ status: 400, msg: '标题不能为空', data: null })
    }

    // // time 不为空 则检测是否通过
    // if (time && !timeVali(time)) {
    //     return res.send({ status: 400, msg: '时间格式错误', data: null })
    // }

    const detail = {
        title,
        desc,
        content,
        time: dayjs().format(),
        daysCount: dayjs().diff(dayjs('2019-10-15'), 'day')
    }
    const recordItem = new record(detail)

    recordItem.save((err, data) => {
        if (err) {
            return res.send({ status: 400, msg: `保存出错`, data: null })
        } else {
            res.send({ status: 200, msg: `添加成功`, data: null })
        }
    })
})

module.exports = router