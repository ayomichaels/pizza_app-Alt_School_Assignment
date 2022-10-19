const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const CustomAPIError = require('../errors/custom-error')

const login = async (req,res)=>{
    const {username,password} = req.body

    //mongoose validation
    //Joi validation
    //check in controller 
    if (!username || !password) {
        throw new CustomAPIError('please provide username and password', 400)
    }

    //use jwt
    // jwt.sign({payload},'privateKey',{expiresIn: 'duration'})
    const id = new Date().getDate()//just for demo, normally provided by DB

    //try to keep payload small, beteer experience for user
    //const token = jwt.sign({payload},'privateKey',{expiresIn: 'duration'})
    const token = jwt.sign({
        username,
        id
    }, process.env.JWT_SECRET,
    {
        expiresIn:'30d'
    }
    )
    res.status(200).json({msg:'user created', token})
}
const createUser = async (req, res) =>{

    const userDetails = req.body
    // console.log(userDetails);
    const user = await User.create(userDetails)

    res.status(201).json({msg: 'User created successfully', user})

}

module.exports = {
    createUser,
    login
}