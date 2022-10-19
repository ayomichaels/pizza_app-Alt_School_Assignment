const express = require('express');
const moment = require('moment');
const { Db } = require('mongodb');
const mongoose = require('mongoose');
const { db } = require('./models/orderModel');
const order = require('./models/orderModel');
const user = require('./models/userModel')
require('dotenv').config()
const authUser = require('./middleware/authUser')
const authRole = require('./middleware/authRole')
const orderRoutes = require ('./routes/orderRoutes')
const userRoutes = require('./routes/usersRoutes')
const {sortedOrders} = require ('./controllers/order')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const PORT = process.env.port || 3334

const app = express()

app.use(express.json());




app.use('/orders', orderRoutes )
//start of user routes
app.use('/login', userRoutes )


//error
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB Successfully");
    // const assignment = client.db(pizza-assignment)
    // Db
});

mongoose.connection.on("error", (err) => {
	console.log("An error occurred while connecting to MongoDB");
	console.log(err);
});
//error
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware); 
app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})