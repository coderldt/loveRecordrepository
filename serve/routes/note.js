const express = require('express')
const router = express.Router()
const { isEmity, timeVali, timeRangeVali } = require('../validator')
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

router.post('/update', async (req, res) => {
    const { id, desc, richTextContent, expectTime } = req.body
    if (isEmity(id)) {
        return res.send({ status: 400, msg: '找不到当前笔记信息', data: null })
    }

    if (expectTime && !timeVali(expectTime)) {
        return res.send({ status: 400, msg: '时间格式错误', data: null })
    }

    let data = null
    try {
        data = await note.findById(id)
    } catch (error) {
        return res.send({ status: 400, msg: `找不到当前笔记信息`, data: null })
    }
    if (data) {
        desc && (data.desc = desc)
        richTextContent && (data.richTextContent = richTextContent)
        expectTime && (data.expectTime = expectTime)

        data.save((err, data) => {
            if (err) {
                return res.send({ status: 400, msg: `出错了`, data: err })
            } else {
                res.send({ status: 200, msg: `更新成功`, data: null })
            }
        })
    } else {
        return res.send({ status: 400, msg: '找不到当前笔记信息', data: null })
    }
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

// 默认按照创建时间排序，有期望时间的筛选条件则按照期望时间筛选
router.post('/list', async (req, res) => {
    const { createTime, expectTime, expectTimeSort = '', createTimeSort = '', pageSize = 10, page = 1 } = req.body

    const sort = {}
    // 默认按照时间排序
    if (expectTimeSort) {
        sort.expectTime = (expectTimeSort === 'asc' ? 1 : -1)
    } else if (createTimeSort) {
        sort.createTime = (createTimeSort === 'asc' ? 1 : -1)
    }
    
    const params = {}
    if (expectTime && (expectTime.start || expectTime.end)) {
        params.expectTime = {  }
        const { start, end } = expectTime
        start && timeVali(start) && (params.expectTime.$gt = dayjs(start).format())
        end && timeVali(end) && (params.expectTime.$lte = dayjs(end).format())
    } else if (createTime && (createTime.start || createTime.end)) {
        params.createTime = {  }
        const { start, end } = createTime
        start && timeVali(start) && (params.createTime.$gt = dayjs(start).format())
        end && timeVali(end) && (params.createTime.$lte = dayjs(end).format())
    }

    note.find(params, null, { sort, skip: (page - 1) * pageSize, limit: pageSize }, async (err, data) => {
        if (err) {
            return res.send({ status: 400, msg: '找不到当前信息', data: null })
        }

        if (data) {
            const finallData = JSON.parse(JSON.stringify(data)).map(item => {
                item.createTime && (item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss'))
                item.expectTime && (item.expectTime = dayjs(item.expectTime).format('YYYY-MM-DD HH:mm:ss'))
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