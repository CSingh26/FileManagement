const express = require('express')
const conn = require('./utils/db')
require('dotenv').config({ path: '/Users/chaitanyasingh/Documents/Project/9/backend/.env'}) //configure your env and enter approraite path

const app = express()
conn()

const PORT = process.env.PORT || 3876

app.listen(PORT, () => {
    console.log("Server is running on " + PORT)
})