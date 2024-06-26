const express = require('express')
const dotenv = require('dotenv').config()
const colors = require("colors")
const connectDB =require("./config/db")

const port = process.env.port || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port,() => console.log(`serevr started on port ${port}`))