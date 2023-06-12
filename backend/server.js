require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')

connectDB()

const app = express()
//middleware
app.use(express.json())
//routes
app.use('/api/advisors', require('./routes/advisorsRoutes'))
//error handler
app.use(errorHandler)


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
)