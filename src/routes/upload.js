const express = require('express')
const app = express.Router()
const {multer} = require('../utils/multer-config')

app.route('/photos')
    .post(multer, (req, res, next) => {
        console.log(req.file)
    })

module.exports = app;