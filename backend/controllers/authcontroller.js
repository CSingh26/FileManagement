const User = require('../models/userModel')
const enc = require('bcryptjs')
const jwt = require('jsonwebtoken')
const emailer = require('nodemailer')
const { google } = require('googleapis')
const { authenticator } = require('otplib')

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
    if (!req.cookies || !req.cookies.token) {
        return res.status(400).json({
            message: "No session found or user already logged out"
        })
    }

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })

    res.status(200).json({
        message: 'User successfully logged out'
    })
}

const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})

const accessToken = oauth2Client.getAccessToken()

const transporter = emailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
})

exports.sendOTP = async (req, res) => {
    const { email } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'Email not found'
            })
        }

        const otp = authenticator.generate(process.env.OTP_KEY)
        user.otp = otp
        user.otpExpires = Date.now() + 300000
        await user.save()

        const mail = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Your OTP for password-reset',
            text: `Your OTP code is ${otp}`
        }

        transporter.sendMail(mail, (error, info) => {
            if (error) {
                return res.status(500).json({
                    message: 'Failed to send the OTP',
                    error: error
                })
            }

            res.status(200).json({
                message: 'OTP sent successfully'
            })
        })
    } catch (err) {
        res.status(500).send(
            'Server Error, Please try again!'
        )
    }
}

exports.verifyOTP = async (req, res) => {
    const { email, otp, newPassword } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Email'
            })
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP has expired"
            })
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP'
            })
        }

        const hashedPwd = await enc.hash(newPassword, 16)
        user.password = hashedPwd
        user.otp = undefined
        user.otpExpires = undefined

        await user.save()

        res.status(200).json({
            message: 'Password reset successfully'
        })
    } catch (err) {
        res.status(500).send('Server Error, Please try again!!')
    }
}