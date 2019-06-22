const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const makanan = require('./routes/makanan')
const user = require('./routes/user')
const meja = require('./routes/meja')
const pelanggan = require('./routes/pelanggan')
const pesanan = require('./routes/pesanan')
const {v1} = require('uuid')
const {multer} = require('./utils/multer-config')
const { checkAuth } = require('./utils/helper')
const upload = require('multer')()

app.use(bodyParser.json()) // tell app to use json

app.use(bodyParser.urlencoded({
    extended: true
}))
// app.use(multer)
app.use(cors({
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
}))

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')))
app.use('/user', user)
app.use('/menu', makanan)
app.post('/photos',multer, (req, res, next) => {
    // const id = v1()
    
    // console.log(userData)
    // console.log(req.id_makanan)
    next();
}, (req, res, next) => {res.end()})
app.use('/pelanggan', pelanggan)
app.use('/pesanan', pesanan)
app.use('/meja', meja)

module.exports = app