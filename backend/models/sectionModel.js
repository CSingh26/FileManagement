const mong = require('mongoose')

const sectionSchema = new mong.Schema({
    user: {
        type: mong.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mong.model('Section', sectionSchema)