const express = require('express')
const auth  = require('../middleware/authMiddleware')
const { createSection, getSection } = require('../controllers/sectionController')

const router = express.Router()

router.route('/getSection')
    .get(auth, getSection)

router.route('/createSection')
    .post(auth, createSection)

module.exports = router
