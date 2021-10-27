const express = require('express')
const router = express.Router()
const { isEmity, timeRangeVali } = require('../validator/index')
const dayjs = require('dayjs')

const record = require('../models/record')

router.post('/create', (req, res) => {
    const { title, desc, content } = req.body
    if (isEmity(title)) {
        return res.send({ status: 400, msg: '标题不能为空', data: null })
    }

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

router.post('/remove', (req, res) => {
    const { id } = req.body
    if (isEmity(id)) {
        return res.send({ status: 400, msg: '找不到当前信息', data: null })
    }

    record.findByIdAndRemove(id, (err, data) => {
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

// asd 正序
// desc 倒序
router.post('/list', async (req, res) => {
    const { time, timeSort = 'asc', pageSize = 10, page = 1 } = req.body
    if (!timeRangeVali(time)) {
        return res.send({ status: 400, msg: '筛选时间错误', data: null })
    }

    const params = {}
    if (time && (time.start || time.end)) {
        params.time = {}
        time.start && (params.time.$gt = dayjs(time.start).format())
        time.end && (params.time.$lte = dayjs(time.end).format())
    }

    let data = null
    try {
        data = await record.find(params, null, { sort: { time: timeSort === 'asc' ? 1 : -1 }, skip: (page - 1) * pageSize, limit: pageSize })
    } catch (error) {
        return res.send({ status: 400, msg: '找不到当前信息', data: null })
    }

    if (data) {
        const finallData = JSON.parse(JSON.stringify(data)).map(item => {
            item.time = dayjs(item.time).format('YYYY-MM-DD HH:ss:mm')
            return item
        })

        const total = await record.find(params).count()

        res.send({ status: 200, msg: `查询成功`, data: { list: finallData, total } })
    } else {
        res.send({ status: 400, msg: '找不到当前信息', data: null })
    }
})

module.exports = router