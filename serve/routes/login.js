const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const md5 = require('md5')
const { isEmity } = require('../validator/index')

const userTable = require('../models/userTables')

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (isEmity(username) || isEmity(password)) {
        return res.send({ status: 403, msg: '用户名或者密码为空', data: null })
    }

    try {
        const data = await userTable.findOne({ username, password })
        if (isEmity(data)) {
            throw new Error()
        }

        const now = dayjs().format("YYYY-MM-DD HH:ss:mm")
        data.token = md5(now)
        console.log(dayjs().add(1, 'day').format("YYYY-MM-DD HH:ss:mm"));
        data.expirationTime = dayjs().add(1, 'day').format("YYYY-MM-DD HH:ss:mm")

        await data.save()
        const { _id: id, phone, avatarUrl, token } = data
        res.send({ status: 200, msg: `登录成功`, data: { 
            id, 
            username, 
            phone, 
            avatarUrl, 
            token
        } })
    } catch (error) {
        console.log(error);
        res.send({ status: 400, msg: '找不到该账户', data: null })
    }
})

module.exports = router