const mong = require('mongoose')
require('dotenv').config({ path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env'}) //configure your env and enter approraite path

const conn = async () => {
    try {
        await mong.connect(process.env.URL) 
        console.log('MongoDB connected')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = conn