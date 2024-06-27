const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const { GridFsStorage } = require('multer-gridfs-storage')
require('dotenv').config({ path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env' })

// Set up temporary disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err)
            }
            const filename = buf.toString('hex') + path.extname(file.originalname)
            cb(null, filename)
        })
    }
})

const upload = multer({ storage })

module.exports = { upload }
