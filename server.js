const express = require('express')
require('dotenv').config()
const colors=require('colors')
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()
const connectDB=require('./config/db')

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/signup', require('./routes/userRoutes'))
app.use('/api/signin',require('./routes/userSignInRoute'))
app.use('/api/getservices',require('./routes/getServicesRoutes'))
app.use('/api/placeorder', require('./routes/orderDetailsRoutes'))
app.use('/api/getaccountinformation',require('./routes/getAccountInformationRoutes'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`server started on port no ${port}`)
})