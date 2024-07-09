const express = require('express')
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/getTasks')
    .get(auth, getTasks)

router.route('/createTask')
    .post(auth, createTask)

router.route('/updateTask/:id')
    .put(auth, updateTask)

router.route('/deleteTask/:id')
    .delete(auth, deleteTask)

module.exports = router