const express = require('express')
const router = express.Router()
const { isEmity } = require('../validator/index')

const userTable = require('../models/userTables')


router.post('/addUser', (req, res) => {
    const { username, password = '123456', phone = '' } = req.body
    if (isEmity(username)) {
        return res.send({ status: 403, msg: '用户名或者密码为空', data: null })
    }

    userTable.findObjOfUsername(username, (data) => {
        // 不为空
        if (!isEmity(data)) {
            res.send({ status: 400, msg: '账户名已存在，请勿重复添加', data: null })
        } else {
            const newUser = new userTable({
                username,
                password,
                phone
            })
            newUser.save((err) => {
                if (err) { console.log(err); }
                else {
                    res.send({ status: 200, msg: `添加成功${password === '123456' ? ',密码默认123456' : ''}`, data: { username } })
                }
            })
        }
    })
})

router.post('/updateUser', (req, res) => {
    const { username, password, phone, avatarUrl } = req.body
    if (isEmity(username)) {
        return res.send({ status: 400, msg: '用户名为空', data: null })
    }

    userTable.findObjOfUsername(username, (data) => {
        if (isEmity(data)) {
            return res.send({ status: 400, msg: '出错了，找不到该账户', data: null })
        }

        password && (data.password = password)
        phone && (data.phone = phone)
        avatarUrl && (data.avatarUrl = avatarUrl)

        data.save((err, data) => {
            if (err) {
                console.log(err);
                return 
            }
            if (isEmity(data)) {
                return res.send({ status: 400, msg: '出错了，更新失败', data: null })
            }
            res.send({ status: 200, msg: '更新成功', data })
        })
    })
})

router.post('/removeUser', (req, res) => {
    const { id } = req.body
    if (isEmity(id)) {
        return res.send({ status: 400, msg: '出错了，找不到该账户', data: null })
    }

    userTable.removeObjOfId(id, (data) => {
        if (isEmity(data)) {
            return res.send({ status: 400, msg: '找不到该账户或已删除', data: null })
        }
        res.send({ status: 200, msg: '删除成功', data: null })
    })
})

router.post('/resetPassword', (req, res) => {
    const { id } = req.body
    if (isEmity(id)) {
        return res.send({ status: 400, msg: 'id为空', data: null })
    }

    userTable.findObjOfId(id, (data) => {
        // 不为空
        if (isEmity(data)) {
            res.send({ status: 400, msg: '找不到该账户信息', data: null })
        } else {
            data.password = '123456'
            data.save((err) => {
                if (err) { console.log(err); }
                else {
                    res.send({ status: 200, msg: `密码重置成功，为123456`, data: {} })
                }
            })
        }
    })
})

router.post('/detail', (req, res) => {
    const { id } = req.body
    if (isEmity(id)) {
        return res.send({ status: 400, msg: 'id为空', data: null })
    }

    userTable.findObjOfId(id, (data) => {
        if (isEmity(data)) {
            return res.send({ status: 400, msg: '出错了，找不到该账户', data: null })
        }
        res.send({ status: 200, msg: '', data })
    })
})

module.exports = router