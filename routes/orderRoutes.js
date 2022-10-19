const express = require('express')
const router = express.Router()


const jwtAuth = require('../middleware/jwt-auth')

const {
    getAllOrders,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/order')

router.route('/').get(jwtAuth, getAllOrders).post(createOrder)
router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder)
module.exports = router

//just finished the order routes for the get method to the homepage. Test it out by commenting out the routes in index,js