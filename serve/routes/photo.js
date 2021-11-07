const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')
const { timeRangeVali } = require('../validator/index')

const photo = require('../models/photo')

router.post('/create', (req, res) => {
    const { title, pics = [], desc } = req.body
    if (!pics.length) {
        return res.send({ status: 400, msg: '请上传至少一张图片', data: null })
    }

    const detail = {
        title,
        pics,
        desc,
        createTime: dayjs().format()
    }

    const data = new photo(detail)

    data.save((err, data) => {
        if (err) {
            return console.log(err);
        } else {
            res.send({ status: 200, msg: `添加成功`, data: data })
        }
    })
})

router.post('/removePic', async (req, res) => {
    const { list } = req.body
    if (!list.length) {
        return res.send({ status: 400, msg: '请选择删除的图片', data: null })
    }

    let obj = {}
    list.forEach(item => {
        const { id, img } = item
        if (obj[id]) {
            obj[id].push(img)
        } else {
            obj[id] = [img]
        }
    });

    Object.entries(obj).forEach(async ([id, pics]) => {
        let data = null
        try {
            data = await photo.findObjOfId(id)
        } catch (error) {
            console.log(error);
            return res.send({ status: 400, msg: '找不到对应数据', data: null })
        }
        if (data) {
            pics.forEach(pic => {
                console.log(data.pics);
                data.pics = data.pics.filter(item => item !== pic)
            })
            
            const cb = (err, data) => {
                if (err) {
                    console.log(err);
                    res.send({ status: 200, msg: `出错了`, data: err })
                }
            }
            if (data.pics.length === 0) {
                photo.findByIdAndRemove(id, cb)
            } else {
                data.save(cb)
            }
        } else {
            res.send({ status: 400, msg: `出错了`, data: err })
        }
    })
    res.send({ status: 200, msg: `删除成功`, data: null })
})

// 只支持到天time
router.post('/list', async (req, res) => {
    const { time, timeSort = 'desc', pageSize = 5, page = 1 } = req.body
    if (!timeRangeVali(time)) {
        return res.send({ status: 400, msg: '筛选时间错误', data: null })
    }

    const params = {
    }
    if (time && (time.start || time.end)) {
        params.createTime = {}
        time.start && (params.createTime.$gte = dayjs(time.start).format())
        time.end && (params.createTime.$lte = dayjs(time.end).endOf('day').format())
    }
    
    photo.find(params, null, { sort: { createTime: timeSort === 'asc' ? 1 : -1 } }, async (err, data) => {
        if (err) {
            console.log(err);
            return res.send({ status: 400, msg: '找不到当前信息', data: null })
        }

        if (data) {
            const finalData = []
            const obj = {}
            data.map(item => {
                const time = dayjs(item.createTime).format('YYYY-MM-DD')
                if (obj[time]) {
                    obj[time].push(item)
                } else {
                    obj[time] = [item]
                }
            })

            Object.entries(obj).map(([key, val]) => {
                finalData.push({
                    createTime: key,
                    list: JSON.parse(JSON.stringify(val)).map(item => {
                        item.createTime = dayjs(item.createTime).format('YYYY-MM-DD HH:ss:mm')
                        return item
                    })
                })
            })

            let totalPic = 0
            const totalDay = await photo.find()
            totalDay.forEach(i => {
                totalPic += i.pics.length
            })

            res.send({ status: 200, msg: `查询成功`, data: { 
                list: finalData.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
                total: finalData.length,
                totalPic
            }})
        } else {
            res.send({ status: 400, msg: '找不到当前信息', data: null })
        }
    })
})

// 评论暂弃
// router.post('/addComment', async (req, res) => {
//     const { photoId, commentId, id, username, desc } = req.body
//     if (isEmity(photoId)) {
//         return res.send({ status: 400, msg: '请选择评论的相册', data: null })
//     }

//     if (isEmity(id)) {
//         return res.send({ status: 400, msg: '个人信息丢失，请重新登陆。', data: null })
//     }

//     if (isEmity(desc)) {
//         return res.send({ status: 400, msg: '评论内容为空', data: null })
//     }

//     let data = null
//     try {
//         data = await photo.findObjOfId(photoId)
//     } catch (error) {
//         console.log(error);
//         return res.send({ status: 400, msg: '找不到对应数据', data: null })
//     }
//     if (data) {
//         // 回复评论
//         if (commentId) {
//         } else {
//             // 新建评论
//             data.comment.push({
//                 username,
//                 id,
//                 desc,
//                 replys: []
//             })
//         }

//         data.save((err, data) => {
//             console.log(err, data);
//             if (err) {
//                 console.log(err);
//                 res.send({ status: 400, msg: `出错了`, data: err })
//             }else {
//                 res.send({ status: 200, msg: `${commentId ? '回复' : '评论'}成功`, data: null })
//             }
//         })
//     } else {
//         res.send({ status: 400, msg: `出错了`, data: err })
//     }
// })

module.exports = router