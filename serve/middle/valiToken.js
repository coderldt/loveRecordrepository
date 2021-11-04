const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const md5 = require('md5')

const userTable = require('../models/userTables')

// 不需要验证的接口
const noViHttpPath = ['/api/login']
const regu = [/^\/upload/]

router.use(async (req, res, next) => {
    
    const path = req.url
    console.log(path);
    if (noViHttpPath.includes(path) || regu.some((re) => re.test(path))) {
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
                console.log('验证', dayjs(expirationTime).isAfter(dayjs(now)));
                if (!expirationTime || dayjs(now).isAfter(dayjs(expirationTime))) {
                    throw new Error('登录失效，请重新登录')
                }

                // data.token = md5(now)
                data.expirationTime = dayjs().add(1, 'day').format("YYYY-MM-DD HH:ss:mm")
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