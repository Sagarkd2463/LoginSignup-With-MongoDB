const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log('Database connected...')
})
.catch(() => {
    console.log('Connection to database failed...')
})

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection = new mongoose.model('LogInCollection', logInSchema)

module.exports = LogInCollection