const express = require('express')
const mongoose = require('mongoose')
// const DB_URL = 'mongodb+srv://Hossein:h0OSRYuYzP2VDKg5@cluster0.rhgxg.mongodb.net/health_care?retryWrites=true&w=majority'
const DB_URL = 'mongodb://localhost:27017/health_care'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Setup cross origin
app.use(require('cors')())

//Bring in routes
app.use('/api/user', require('./routers/user.router'))
// app.use('/api/chatroom', require('./routes/chatroom'))
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongodb')
        app.listen(5000, () => {
            console.log('Server is running on port 5000')
        })
    })


module.exports = app