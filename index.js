const express = require('express');
const moment = require('moment');
const { Db } = require('mongodb');
const mongoose = require('mongoose');
const { db } = require('./models/orderModel');
const order = require('./models/orderModel');
const user = require('./models/userModel')
require('dotenv').config()
const authUser = require('./middleware/authenticate')

const PORT = process.env.port || 3334

const app = express()

app.use(express.json());

//start of user routes

app.post('/', async (req, res) =>{
    const {username, password} = req.body
    const userDetails = await user.create(req.body)
    if (!username || !password) {
        return res.status(403).json({err: 'You have to input all details required'})
    }
    
    return res.status(201).json({userDetails})
})

app.get('/', async (req, res) => {
    const allUsers = await user.find()
    return res.json({ allUsers})
})

//end of user routes

//start of order routes
app.get('/', (req, res) => {
    return res.json({ status: true })
})

app.post('/order', async (req, res) => {
    const body = req.body;

    const total_price = body.items.reduce((prev, curr) => {
        prev += curr.price
        return prev
    }, 0);

    const order = await order.create({ 
        items: body.items,
        created_at: moment().toDate(),
        total_price
    })
    
    return res.json({ status: true, order })
})

app.get('/order/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const order = await order.findById(orderId)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    return res.json({ status: true, order })
})

app.get('/orders', authUser, async (req, res) => {
    const orders = await order.find()

    return res.json({ status: true, orders })
})

app.patch('/order/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    const order = await order.findById(id)

    if (!order) {
        return res.status(404).json({ status: false, order: null })
    }

    if (state < order.state) {
        return res.status(422).json({ status: false, order: null, message: 'Invalid operation' })
    }

    order.state = state;

    await order.save()

    return res.json({ status: true, order })
})

app.delete('/order/:id', async (req, res) => {
    const { id } = req.params;

    const order = await order.deleteOne({ _id: id})

    return res.json({ status: true, order })
})


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

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})