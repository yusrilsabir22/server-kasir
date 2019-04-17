const path = require('path') // define path
const multer = require('multer') // middleware for image

/**
 * @param {1} req express Request
 * @param {2} file express handle request file
 * @param {3} cb as callback
 */

const storage = multer.diskStorage({ // storage configuration
    destination: (req, file, cb) => { // cb as callback
        console.log(file)
        cb(null, path.resolve(__dirname, '../', 'uploads')) // set where file to be save
    },
    filename: (req, file, cb) => {
        if (req.query.type) {
            cb(null, Date.now() + '_' + req.query.type + path.extname(file.originalname)) // set file name
        }
    }
})

/**
 * cb as callback is a function
 * callback @param {1} Error throw an error exception
 * callback @param {2} Boolean true or false
 */
const fileFilter = (req, file, cb) => {
    console.log(file)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage, // storage configuration
    limits: {
        fileSize: 1024 * 1024 * 5 // set limit for filesize
    },
    fileFilter, // filter configuration
})

module.exports = {
    multer: upload.single('imageUrl'),
} // define our form data name, in this i define as images