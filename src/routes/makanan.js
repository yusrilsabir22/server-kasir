const express = require('express')
const app = express.Router()
const {
    getData,
    addData,
    deleteData,
    testUpdateQuery
} = require('../controllers/makanan')
const {multer} = require('../utils/multer-config')

app.route('/makanan')
    .post(multer, addData) // create
    .get(getData) // read
    .put(multer, testUpdateQuery) // update
    .delete(deleteData); // delete

module.exports = app