const Section = require('../models/sectionModel')
const Task = require('../models/taskModel')

exports.createSection = async (req, res) => {
    try {
        const { name } = req.body

        const newSection = new Section({
            user: req.user.id,
            name
        })

        const savedSection = await newSection.save()
        res.status(201).json({
            message: 'Section created successfully',
            section: savedSection
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.getSection = async (req, res) => {
    try {
        const sections = await Section.find({ user: req.user.id })
        res.json(sections)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const { id } = req.params

        const section = await Section.findById(id)

        if (!section) {
            return res.status(404).json({
                message: 'Section not found'
            })
        }

        if (section.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'User not authorized'
            })
        }

        await Task.updateMany({ sectionName: section.name }, { $set: { sectionName: '' } })
        await section.deleteOne()

        res.status(200).json({
            message: 'Section deleted successfully'
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.updateSection = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const section = await Section.findById(id)

        if (!section) {
            return res.status(400).json({
                message: 'Section not found'
            })
        }

        if (section.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: 'User not authorized'
            })
        }

        section.name = name || section.name

        const updatedSection = await section.save()

        res.status(200).json({
            section: updatedSection
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}