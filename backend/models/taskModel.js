const mong = require('mongoose')

const TaskSchema = new mong.Schema({
    user: {
        type: mong.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    dueDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    projectName: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mong.model('Task', TaskSchema)