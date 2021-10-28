const express = require('express')
const router = express.Router()

const detail = require('../models/detail')

router.post('/update', async (req, res) => {
    // iitoipo
    const { user, detail: msg, sigh } = req.body

    let data = null
    try {
        data = await detail.findOne({ sigh })
        if (!data) {
            throw new Error('找不到详情信息')
        }
    } catch (error) {
        return res.send({ status: 400, msg: '找不到详情信息', data: null })
    }
    data.user = user
    data.detail = {
        ...data.detail,
        ...msg
    }
    data.save((err, data) => {
        if (err) {
            return res.send({ status: 400, msg: `出错了`, data: err })
        } else {
            res.send({ status: 200, msg: `更新成功`, data })
        }
    })
})

module.exports = router