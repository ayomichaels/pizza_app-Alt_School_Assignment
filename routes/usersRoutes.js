const express = require('express')
const router = express.Router()

const {createUser, login} = require('../controllers/user')

router.route('/').post(login)

module.exports = router