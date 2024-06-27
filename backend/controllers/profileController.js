const UserProfile = require('../models/userProfie')
const fs = require('fs')
const path = require('path')
const mong = require('mongoose')

exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({
            user: req.user.id
        }).populate('user')

        if (!userProfile) {
            return res.status(404).json({
                message: 'Profile not found',
                user: userProfile
            })
        }
        
        res.json(userProfile)
    } catch (err) {
        res.status(500).json({
            message: 'Server Error'
        })
    }
}

exports.createUserProfile = async (req, res) => {
    try {
        const { name, age, dateOfBirth } = req.body
        const userProfile = new UserProfile({
            user: req.user.id,
            name,
            age,
            dateOfBirth
        })

        await userProfile.save()

        res.status(201).json({
            message: 'User Profile Created'
        })
    } catch (err) {
        res.status(500).json({
            message: 'Server Error',
            error: err
        })
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, age, dateOfBirth } = req.body
        const userProfile = await UserProfile.findOneAndUpdate(
            { user: req.user.id }, 
            { name, age, dateOfBirth }, 
            { new: true, runValidators: true }
        )

        if (!userProfile) {
            return res.status(404).json({
                message: 'Profile not found'
            })
        }

        res.json({
            message: 'User Profile updated successfully',
        })
    } catch (err) {
        res.status(500).json({
            message: 'Server Error',
            error: err
        })
    }
}

exports.uploadProfilePhoto = async (req, res) => {
    try {
        const gfs = req.app.get('gfs')
        if (!gfs) {
            return res.status(500).json({
                message: 'GridFS is not initialized'
            })
        }

        console.log('Starting profile photo upload...')
        const userProfile = await UserProfile.findOne({
            user: req.user.id
        })

        if (!userProfile) {
            return res.status(404).json({
                message: 'Profile not found'
            })
        }

        console.log('Creating write stream...')
        const writeStream = gfs.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype
        })

        const readStream = fs.createReadStream(path.join(__dirname, '../uploads/', req.file.filename))
        readStream.pipe(writeStream)

        writeStream.on('finish', async (file) => {
            userProfile.profilePhoto = file._id
            await userProfile.save()
            res.json({
                message: 'Profile photo uploaded successfully'
            })

            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error removing file:', err);
                }
            })
        })

        writeStream.on('error', (err) => {
            console.error('Error during file upload:', err)
            res.status(500).json({
                message: 'File upload error',
                error: err.message
            })
        })
    } catch (err) {
        console.error('Server Error:', err)
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        })
    }
}