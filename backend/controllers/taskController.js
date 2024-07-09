const Task = require('../models/taskModel')

exports.createTask = async (req, res) => {
    try {
        const { name, dueDate, description, severity, projectName } = req.body
        const user = req.user.description

        const newTask = new Task({
            user,
            name,
            dueDate,
            description,
            severity,
            projectName
        })

        const savedTask = await newTask.save()
        res.status(201).json({
            message: "Task Made Successfully"
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Sever Error'
        })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        })

        if (tasks) {
            res.status(201).json({
                message: "Task fetched"
            })
        } else {
            res.status(400).json({
                message: 'This user have no tasks scheduled'
            })
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Sever Error'
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { name, dueDate, description, severity, projectName } = req.body

        const task = await Task.findById(id)

        if (!task) {
            return res.status(400).json({
                message: 'Task not found'
            })
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'User not authorized for this task'
            })
        }

        task.name = name || task.name
        task.dueDate = dueDate || task.dueDate
        task.description = description || task.description
        task.severity = severity || task.severity
        task.projectName = projectName || task.projectName

        const updatedTask  = await task.save()

        res.status(201).json({
            'message': 'Task Updated!!'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Sever Error'
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        const task = await Task.findById(id)

        if (!task) {
            return res.status(400).json({
                message: 'Task not found'
            })
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'User not authorized for this task'
            })
        }

        await task.remove()

        res.status(201).json({
            message: 'Task Removed'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Sever Error'
        })
    }
}