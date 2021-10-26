const express = require('express')
const router = express.Router()
const { isEmity } = require('../validator/index')
const dayjs = require('dayjs')

const mood = require('../models/moods')

router.post('/create', (req, res) => {
    const { status, desc = '', time } = req.body
    if (isEmity(status)) {
        return res.send({ status: 400, msg: '当前心情状态为空', data: null })
    }

    const detail = {
        status,
        desc,
        time: dayjs(time).format() || dayjs().format()
    }
    const moodItem = new mood(detail)

    moodItem.save((err, data) => {
        if (err) {
            return console.log(err);
        } else {
            res.send({ status: 200, msg: `添加成功`, data: null })
        }
    })
})

router.post('/removeItem', (req, res) => {
    const { id } = req
    if (isEmity(id)) {
        return res.send({ status: 400, msg: '找不到当前信息', data: null })
    }

    mood.findByIdAndRemove(id, (err, data) => {
        if (err) {
            return console.log(err);
        }
        if (data) {

        }
        else {
            res.send({ status: 200, msg: `添加成功`, data: null })
        }
    })
})

module.exports = router