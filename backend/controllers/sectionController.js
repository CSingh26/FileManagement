const Section = require('../models/sectionModel')

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
        const sections = await Section.find({
            user: req.user.id
        })
        res.json(sections)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Server Error'
        })
    }
}