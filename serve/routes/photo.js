const express = require('express')
const router = express.Router()

const photo = require('../models/photo')

router.post('/create', (req, res) => {
    // const { status, desc = '', time } = req.body
    // if (!moodStatusVali(status)) {
    //     return res.send({ status: 400, msg: '心情状态错误', data: null })
    // }

    // // // time 不为空 则检测是否通过
    // if (time && !timeVali(time)) {
    //     return res.send({ status: 400, msg: '时间格式错误', data: null })
    // }

    // const detail = {
    //     status,
    //     desc,
    //     time: dayjs(time).format() || dayjs().format()
    // }
    // const moodItem = new mood(detail)

    // moodItem.save((err, data) => {
    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         res.send({ status: 200, msg: `添加成功`, data: null })
    //     }
    // })
})

module.exports = router