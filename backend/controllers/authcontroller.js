const User = require('../models/userModel')
const enc = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('dotenv').config({ path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env'}) //configure your env and enter approraite path

exports.register = async (req, res) => {
    const { username, email, password} = req.body

    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'Email alreaady used'
            })
        }

        user = new User({
            username: username,
            email: email,
            password: password
        })

        await user.save()

        res.status(201).json({
            message: "Regsitration Successfull"
        })

    } catch (err) {
        res.status(500).send('Server Error, Please try again!!')
    }
}

exports.login = async(req, res) => {
    const { username, password } = req.body

    try {
        let user = await User.findOne({ username })
        if(!user) {
            return res.status(400).json({
                message: 'Invalid User Credentials'
            })
        }

        const isMatch = await enc.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Password'
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict'
              })

            res.status(200).json({
                message: 'Login successful',
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                }
            })
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error, Please try again!!')
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({
        message: 'User Logged Out'
    })
}