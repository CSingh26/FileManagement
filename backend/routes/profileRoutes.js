const express = require('express')
const { 
    getUserProfile ,
    createUserProfile,
    uploadProfilePhoto,
    updateUserProfile
} = require('../controllers/profileController')
const { upload } = require('../middleware/upload')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', auth, getUserProfile)
router.post('/create', auth, createUserProfile)
router.put('/update', auth, updateUserProfile)
router.post('/photo', auth, upload.single('profilePhoto'), uploadProfilePhoto)

module.exports = router
