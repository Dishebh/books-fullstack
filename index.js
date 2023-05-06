const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const booksRouter = require('./router/apis/books');
const connectDB = require('./connectDB');

connectDB();

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.use('/api/v1/books', booksRouter)

app.listen(3000, () => {
    console.log('Server started listening on port 3000!')
})