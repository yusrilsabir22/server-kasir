require('dotenv').config()
const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.SECRET_MEMBER)
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}
module.exports = {
    checkAuth
}