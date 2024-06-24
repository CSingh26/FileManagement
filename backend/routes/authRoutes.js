const express = require('express')
const { register, login, logout, sendOTP, verifyOTP } = require('../controllers/authcontroller')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/request-otp', sendOTP)
router.post('/verify-otp', verifyOTP)

module.exports = router