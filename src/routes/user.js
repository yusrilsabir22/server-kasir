const express = require('express')
const app = express.Router()

const { signIn, signUp } = require('../controllers/user')

app.route('/auth')
    .post((req, res, next)=> {
        if (req.query.type === 'sign-in') {
            return signIn(req, res, next)
        } else if(req.query.type === 'sign-up') {
            return signUp(req, res, next)
        } else {
            return res.status(500).json({
                message: 'something went wrong'
            }).end()
        }
    })

module.exports = app