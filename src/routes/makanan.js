const express = require('express')
const app = express.Router()
const {getData, addData, updateData} = require('../controllers/makanan')
app.route('/makanan')
    .get(getData)
    .post(addData)
    .put(updateData)

module.exports = app