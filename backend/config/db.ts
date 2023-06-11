const mongoose = require('mongoose');

const connString = process.env.DATABASE_CONNECTION

const connectDB = async () => {
    try {
        await mongoose.connect(connString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log('Mongodb connected successfully')
    } catch (error) {
        console.log('Mongodb failed miserably')
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB