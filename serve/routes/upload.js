const express = require('express')
const router = express.Router()

const multer = require('../upload/main')

router.post('/upload', multer.any(), (req, res) => {
    console.log(req.files);
    res.send({ status: 200, msg: '上传成功', data: req.files.map(item => { return item.path.replace(/\\/g, '/') }) })
})

module.exports = router