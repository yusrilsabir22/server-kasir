const path = require('path') // define path
const multer = require('multer') // middleware for image
const {v1} = require('uuid')

/**
 * @param {1} req express Request
 * @param {2} file express handle request file
 * @param {3} cb as callback
 */

const storage = multer.diskStorage({ // storage configuration
    destination: (req, file, cb) => { // cb as callback
        cb(null, path.resolve(__dirname, '../', 'uploads')) // set where file to be save
    },
    filename: (req, file, cb) => {
        let id = ''
        if(req.query.method == 'update') {
            id = req.query.id
        } else if(req.query.method == 'post') {
            id = v1()
        }
        
        req.userData = {
            id: id
        }
        cb(null, id + path.extname(file.originalname)) // set file name
    }
})

/**
 * cb as callback is a function
 * callback @param {1} Error throw an error exception
 * callback @param {2} Boolean true or false
 */
const fileFilter = (req, file, cb) => {
    if(!!file) {
        if (req.query.method == 'update' || req.query.method == 'post') {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
                cb(null, true)
            } else {
                cb(null, false)
            }
        } else {
            cb(null, false)
        }
    } else {
        cb(null, false)
    }
}

const upload = multer({
    fileFilter, // filter configuration
    storage, // storage configuration
    limits: {
        fileSize: 1024 * 1024 * 5 // set limit for filesize
    },
})

module.exports ={ 
    multer: upload.single('imageUrl')
}