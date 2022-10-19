const User = require('../models/userModel')

//Verification
//1 -- If username does not belong to any names in the database it'll return an error PASSED


const authUser = async (req,res,next) =>{
    try {
        const {username, password, user_type} = req.body
        const users = await User.find()
        const userFound = users.find((user)=>user.username === username)
        
        if (!userFound) {
            return res.status(403).json({msg: 'USER DOES NOT EXIST, KINDLY SIGN UP '})
        }
        

    } catch (error) {
        console.log(error);
    }
    next()
}


module.exports = authUser