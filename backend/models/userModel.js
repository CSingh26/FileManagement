const mong = require('mongoose')
const enc = require('bcryptjs')

const User = new mong.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }
})

User.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await enc.genSalt(16)
    this.password = await enc.hash(this.password, salt)
    next()
})

module.exports = mong.model('User', User)