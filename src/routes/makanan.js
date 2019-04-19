const express = require('express')
const app = express.Router()
const {
    getData,
    addData,
    changeDataMenu,
    deleteData
} = require('../controllers/makanan')
const {
    multer
} = require('../utils/multer-config')
app.route('/makanan')
    .get(getData)
    .post(multer, addData)
    .put(multer, changeDataMenu)
    .delete(deleteData)

module.exports = app