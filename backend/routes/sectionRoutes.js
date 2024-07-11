const express = require('express')
const auth  = require('../middleware/authMiddleware')
const { createSection, getSection, deleteSection, updateSection } = require('../controllers/sectionController')

const router = express.Router()

router.route('/getSection')
    .get(auth, getSection)

router.route('/createSection')
    .post(auth, createSection)

router.route('/deleteSection/:id')
    .delete(auth, deleteSection)

router.route('/updateSection/:id')
    .put(auth, updateSection)

module.exports = router
