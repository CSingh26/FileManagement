const mong = require('mongoose')

const UserProfileSchema  = new mong.Schema({
    user: {
        type: mong.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        requied: true
    }, 
    age: {
        type: Number, 
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    profilePhoto: {
        type: mong.Schema.Types.ObjectId,
        ref: 'photos.files'
    }
})

module.exports = mong.model('UserProfile', UserProfileSchema)