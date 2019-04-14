const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const makanan = require('./routes/makanan')
const user = require('./routes/user')
const {checkAuth} = require('./utils/helper')
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json()) // tell app to use json

app.use(cors({
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
}))
// app.use((req, res, next) => { // setting cors for every request
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     res.header("Access-Control-Allow-Origin", "*");
//     if (req.method === "OPTIONS") {

//         res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         return res.status(200).json({}).end();
//     }
//     next();
// })

app.use('/menu', checkAuth, makanan)
app.use('/user', user)

module.exports = app