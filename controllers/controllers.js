const user = require('../models/userModel');
const Order = require('../models/orderModel');
const moment = require('moment')




const getAllOrders = async (req,res)=>{
    const {limit,sort, type, state, page} = req.query

    //sort by price and date created in ascending and descending
    
    if (sort === 'time' && type === 'descending' ) {
        const sortedOrders = await Order.find().sort({
            created_at : -1
        })
        console.log('Orders sorted by time in descending order');
        return res.status(200).json({ sortedOrders })
    } else if (sort === 'price' && type === 'ascending') {
        const sortedOrders = await Order.find().sort({
            total_price : 1
        })
        console.log('Orders sorted in ascending order');
        return res.status(200).json({ sortedOrders })
    }

    //query by pagination and limit
    if (page) {
        console.log('we can apply pagination');
        const orders = await Order.find({})
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const paginatedOrders = orders.slice(startIndex, endIndex)
        console.log(`Number of entries on page : ${paginatedOrders.length}`);
        return res.status(200).json({paginatedOrders})
    }

    const orders = await Order.find()
    // if (limit) {
    //     console.log(limit);
    //     let limitedOrders = orders.slice(0, Number(limit))
    //     console.log(`Total number of limit entries : ${limitedOrders.length}`);
    //     return res.status(200).json({ limitedOrders })

    // }

    //query by state
    if (state===1) {
        const orders = orders.filter((order)=>order.state===1)
        console.log('Orders queried using State 1: pending');
        return res.status(200).json({ orders })
    } else if (state === 2) {
        const orders = orders.filter((order)=>order.state===2)
        console.log('Orders queried using State 2: preparing');
        return res.status(200).json({ orders })
    } else if (state === 3) {
        const orders = orders.filter((order)=>order.state===3)
        console.log('Orders queried using State 3: delivered');
        return res.status(200).json({ orders })
    }


    console.log(`No filter applied. Total number of entries : ${orders.length}`);
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
    const state = body.state
    const order = await Order.findOneAndUpdate({ _id:orderID}, body, {new:true})
    // const order = await Order.findById(orderID)
    if (!order) {
        return res.status(404).json({msg: 'ORDER NOT FOUND, CHECK ORDER ID'})
    }

    

    if (state < order.state || state > 3) {
        return res.status(422).json({msg: 'INVALID OPERATION'})
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