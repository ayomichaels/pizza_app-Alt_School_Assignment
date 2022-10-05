const user = require('../models/userModel');
const Order = require('../models/orderModel');
const moment = require('moment')


//for the updateOrder make it simpler for the customer to update their order. Don't just use id to update find something simpler

// Can you create a simpler ID to serve as an ID to get the order just like dodo pizza that uses your Name. You can use the first name

//You can protect the get order routes for users to just be only be able to view their own order. Use password

const getAllOrders = async (req,res)=>{
    const orders = await Order.find()
    res.status(200).json({ orders })
    const {limit,sort} = req.query
    if (limit) {
        console.log(limit);
        let limitedOrders = orders.slice(0, Number(limit))
        console.log(`Total number of limit entries : ${limitedOrders.length}`);
        return res.status(200).json({ limitedOrders })

    }
    console.log(`Total number of entries : ${orders.length}`);
    res.status(200).json({ orders })
}

const createOrder = async (req,res) =>{
    const total_price = req.body.items.reduce((prev, curr)=>{
        prev +=curr.price
        return prev
    }, 0)

    const order = await Order.create({
        items: req.body.items,
        created_at: moment().toDate(),
        total_price
    })


    res.status(201).json({status: 'succesful', order })
}

const getOrder = async (req,res) =>{
    const {id:orderID} = req.params
    const order = await Order.findOne({ _id:orderID })
    res.status(200).json({ order })
}

const updateOrder = async (req, res)=>{
    const {id:orderID} = req.params
    const body = req.body
    const order = await Order.findOneAndUpdate({ _id:orderID}, body, {new:true})
    // const order = await Order.findById(orderID)
    if (!order) {
        return res.status(404).json({msg: 'ORDER NOT FOUND, CHECK ORDER ID'})
    }
    
    res.status(200).json({msg: 'update successful', order })
}

const deleteOrder = async(req, res) =>{
    const {id:orderID} = req.params
    const order = await Order.findOneAndDelete({_id:orderID})
    if (!order) {
        return res.status(500).json({msg: 'ORDER NOT FOUND, CHECK ORDER ID'})
    }
    res.status(200).json({msg: 'delete succesful', order })
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder

}