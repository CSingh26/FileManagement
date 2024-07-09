const express = require('express')
const conn = require('./utils/db')
const routes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const taskRoutes = require('./routes/taskRoutes')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookie = require('cookie-parser')
const path = require('path')

require('dotenv').config({
    path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env'
}) //configure your env and enter approraite path

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookie())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 3876

conn().then(({ gfs }) => {
    app.set('gfs', gfs)
    app.use('/auth', routes)
    app.use('/profile', profileRoutes)
    app.use('/tasks', taskRoutes)


    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    })
}).catch(err => {
    console.error("Failed to connect to MongoDB", err)
})