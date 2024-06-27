const mong = require('mongoose')
const { GridFSBucket } = require('mongodb')

require('dotenv').config({
    path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env'
}) //configure your env and enter approraite path

const connectDB = async () => {
    try {
        const conn = await mong.connect(process.env.URL)
        console.log('MongoDB connected')

        const gfs = new GridFSBucket(conn.connection.db, {
            bucketName: 'photos'
        })

        return { conn, gfs }
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB