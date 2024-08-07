const Task = require('../models/taskModel')

exports.createTask = async (req, res) => {
    try {
        const { name, dueDate, description, severity, projectName, sectionName } = req.body

        const newTask = new Task({
            user: req.user.id,
            name,
            dueDate,
            description,
            severity,
            projectName,
            sectionName
        })

        const savedTask = await newTask.save()
        res.status(201).json({
            message: "Task created successfully",
            task: savedTask
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id })
        res.json(tasks)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { name, dueDate, description, severity, projectName, sectionName } = req.body

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
        task.sectionName = sectionName || task.sectionName

        const updatedTask  = await task.save()

        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
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

        await task.deleteOne()

        res.status(200).json({
            message: 'Task deleted successfully'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.updateTaskSection = async (req,res) => {
    try {
        const { id } = req.params
        const { sectionName } = req.body

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

        task.sectionName = sectionName
        const updatedTask = await task.save()

        res.status(200).json({
            task: updatedTask
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}
