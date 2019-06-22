const express = require('express')
const app = express.Router()
const {
    getData,
    addData,
    getDataUserAndFood
} = require('../controllers/pesanan')
app.route('/')
    .get(getDataUserAndFood)
    .post(addData)

module.exports = app