const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')
const dayjs = require('dayjs')

const cancelRepeat = (md5Val, dir) => {
    return new Promise((resolve, reject) => {
        fs.access(dir, (e, data) => {
            if (e) {
                try {
                    fs.mkdirSync(dir)
                } catch (error) {
                    reject(false)              
                }
            } 
            fs.readdir(dir, (err, files) => {
                if (err) {
                    reject(false)
                } else {
                    files.forEach(item => {
                        try {
                            const data = fs.readFileSync(`${dir}/${item}`)
                            if (md5(data) === md5Val) {
                                resolve(`${dir}/${item}`)
                            }
                        } catch (error) {
                            reject(false)
                        }
                    })
                    resolve('')
                }
            })
        })
    })
}

router.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const paths = []
    Object.values(req.files).forEach(async val => {
        const { name, md5 } = val

        const folderName = dayjs().format('YYYY-MM-DD')
        const path = `./upload/img/${folderName}`
        try { 
            const imgPath = await cancelRepeat(md5, path)
            if (imgPath) {
                paths.push(imgPath.replace('./', '/'))
            } else {
                const suffixNname = `${Date.now()}.${name.split('.').slice(-1)}`
                const uploadPath = `${path}/${suffixNname}`
                await val.mv(uploadPath)
                paths.push(uploadPath.replace('./', '/'))
            }
            // 异步问题，凑合先判断长度
            if (paths.length === Object.keys(req.files).length) {
                res.send({ status: 200, msg: '上传成功', data: paths })
            }
        } catch (error) {
            console.log(error);
            if (paths.length) {
                res.send({ status: 200, msg: '部分上传失败', data: paths });
            }
            res.send({ status: 400, msg: '上传失败', data: null });
        }
    })
})

module.exports = router