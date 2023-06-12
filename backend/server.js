require('dotenv').config()

const express = require('express')
const connectdb = require('./config/db')

connectdb()

const app = express()

app.use(express.json())

app.use('/api/advisors', require('./routes/advisorsRoutes'))

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
)