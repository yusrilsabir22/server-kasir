const express = require('express')
const app = express.Router()
const {
    getData,
    addData,
    deleteData,
    updateData
} = require('../controllers/pelanggan')
app.route('/')
    .get(getData)
    .post(addData)
    .put(updateData)
    .delete(deleteData)

module.exports = app