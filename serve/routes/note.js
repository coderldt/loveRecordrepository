const express = require('express')
const router = express.Router()
const { isEmity, timeVali } = require('../validator')
const dayjs = require('dayjs')

const note = require('../models/note')

router.post('/create', (req, res) => {
    const { title, desc, richTextContent, expectTime } = req.body
    if (isEmity(title)) {
        return res.send({ status: 400, msg: '标题不能为空', data: null })
    }

    if (expectTime && !timeVali(expectTime)) {
        return res.send({ status: 400, msg: '时间格式错误', data: null })
    }

    const detail = {
        title,
        desc,
        richTextContent,
        createTime: dayjs().format(),
        expectTime
    }
    const moodItem = new note(detail)

    moodItem.save((err, data) => {
        if (err) {
            return res.send({ status: 400, msg: `出错了`, data: err })
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

    note.findByIdAndRemove(id, (err, data) => {
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
    const { time, expectTimeSort, pageSize = 10, page = 1 } = req.body

    if (!timeRangeVali(time)) {
        return res.send({ status: 400, msg: '筛选时间错误', data: null })
    }

    const params = {}
    if (expectTimeSort) {
        params.createTime = {}
        time.start && (params.createTime.$gt = dayjs(time.start).format())
        time.end && (params.createTime.$lte = dayjs(time.end).format())
    }
    if (time && (time.start || time.end)) {
        params.time = {}
        time.start && (params.time.$gt = dayjs(time.start).format())
        time.end && (params.time.$lte = dayjs(time.end).format())
    }

    note.find(params, null, { sort: { time: timeSort === 'asc' ? 1 : -1 }, skip: (page - 1) * pageSize, limit: pageSize }, async (err, data) => {
        if (err) {
            console.log(err);
            return res.send({ status: 400, msg: '找不到当前信息', data: null })
        }
        if (data) {
            const finallData = JSON.parse(JSON.stringify(data)).map(item => {
                item.time = dayjs(item.time).format('YYYY-MM-DD HH:ss:mm')
                return item
            })

            const total = await note.find(params).count()

            res.send({ status: 200, msg: `查询成功`, data: { list: finallData, total } })
        } else {
            res.send({ status: 400, msg: '找不到当前信息', data: null })
        }
    })
})

module.exports = router