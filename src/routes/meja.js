const express = require('express')
const app = express.Router()
const {
    getData,
    updateData
} = require('../controllers/meja')

app.route('/')
    .get(getData)
    .put(updateData)

module.exports = app