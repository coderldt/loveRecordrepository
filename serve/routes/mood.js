const express = require('express')
const router = express.Router()
const { isEmity, moodStatusVali, timeVali, timeRangeVali } = require('../validator/index')
const dayjs = require('dayjs')

const mood = require('../models/moods')

router.post('/create', (req, res) => {
    const { status, desc = '', time } = req.body
    if (!moodStatusVali(status)) {
        return res.send({ status: 400, msg: '心情状态错误', data: null })
    }

    // // time 不为空 则检测是否通过
    if (time && !timeVali(time)) {
        return res.send({ status: 400, msg: '时间格式错误', data: null })
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

router.post('/remove', (req, res) => {
    const { id } = req.body
    if (isEmity(id)) {
        return res.send({ status: 400, msg: '找不到当前信息', data: null })
    }

    mood.findByIdAndRemove(id, (err, data) => {
        if (err) {
            console.log(err);
            return res.send({ status: 400, msg: '找不到当前信息', data: null })
        }
        if (data) {
            res.send({ status: 200, msg: `删除成功`, data: null })
        } else {
            res.send({ status: 400, msg: '找不到当前信息', data: null })
        }
    })
}) 

router.post('/list', async (req, res) => {
    // asd 正序
    // desc 倒序
    const { time, status, timeSort = 'asc', pageSize = 10, page = 1 } = req.body
    if (status && !moodStatusVali(status)) {
        return res.send({ status: 400, msg: '心情状态错误', data: null })
    }

    if (!timeRangeVali(time)) {
        return res.send({ status: 400, msg: '筛选时间错误', data: null })
    }

    const params = {}
    status && (params.status = status)
    if (time && (time.start || time.end)) {
        params.time = {}
        time.start && (params.time.$gt = dayjs(time.start).format())
        time.end && (params.time.$lte = dayjs(time.end).format())
    }

    mood.find(params, null, { sort: { time: timeSort === 'asc' ? 1 : -1 }, skip: (page - 1) * pageSize, limit: pageSize }, async (err, data) => {
        if (err) {
            console.log(err);
            return res.send({ status: 400, msg: '找不到当前信息', data: null })
        }
        if (data) {
            const finallData = JSON.parse(JSON.stringify(data)).map(item => {
                item.time = dayjs(item.time).format('YYYY-MM-DD HH:ss:mm')
                return item
            })

            const total = await mood.find(params).count()

            res.send({ status: 200, msg: `查询成功`, data: { list: finallData, total } })
        } else {
            res.send({ status: 400, msg: '找不到当前信息', data: null })
        }
    })
})

module.exports = router