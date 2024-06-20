const express = require('express')
const conn = require('./utils/db')
const routes = require('./routes/authRoutes')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config({ path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env'}) //configure your env and enter approraite path

const app = express()

conn()

app.use(cors())
app.use(bodyParser.json())
app.use('/auth', routes)

const PORT = process.env.PORT || 3876

app.listen(PORT, () => {
    console.log("Server is running on " + PORT)
})