const User = require('../models/userModel')

//TEST
//2 -- If user's user_type != 'admin' restrict access passed
const authRole = async (req,res,next) =>{
    try {
        const {username, password, user_type} = req.body
        const users = await User.find()
        const userFound = users.find((user)=>user.username === username)
        const userRole = userFound.user_type
    if (userRole != 'admin') {
        return res.status(403).json({msg: 'USER DOES NOT HAVE ACCESS TO THIS RESOURCE'})
    }
    } catch (error) {
        console.log(error);
    }
    next()

}

module.exports = authRole