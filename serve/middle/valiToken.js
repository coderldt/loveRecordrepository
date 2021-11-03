const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const md5 = require('md5')

const userTable = require('../models/userTables')

// 不需要验证的接口
const noViHttpPath = ['/login']

router.use(async (req, res, next) => {
    
    const path = req.url

    if (noViHttpPath.includes(path)) {
        next()
    } else {
        const { token } = req.headers
        if (token) {
            try {
                const data = await userTable.findOne({ token })
                if (!data) {
                    throw new Error('登录失效，请重新登录')
                } 

                const { expirationTime } = data
                const now = dayjs().format("YYYY-MM-DD HH:ss:mm")
                if (!expirationTime || dayjs(now).isAfter(dayjs(expirationTime))) {
                    throw new Error('登录失效，请重新登录')
                }

                data.token = md5(now)
                data.expirationTime = dayjs().add(8, 'hour').format("YYYY-MM-DD HH:ss:mm")
                await data.save()
                next()
            } catch (error) {
                res.send({ status: 401, msg: '登录失效，请重新登录', data: null })
            }
        } else {
            res.send({ status: 401, msg: '登录失效，请重新登录', data: null })
        }
    }
})

module.exports = router