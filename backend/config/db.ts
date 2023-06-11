const mongoose = require('mongoose');

const connString = ''

const connectDB = async () => {
    try {
        await mongoose.connect(connString, {
            useCreateIndex: true,
            useFindAndModify: false,
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