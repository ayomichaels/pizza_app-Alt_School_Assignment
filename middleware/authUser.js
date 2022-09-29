const User = require('../models/userModel')

//Test
//1 -- If username does not belong to any names in the database it'll return an error PASSED


const authUser = async (req,res,next) =>{
    try {
        const {username, password, user_type} = req.body
        // console.log(username);
        const users = await User.find()
        const userFound = users.find((user)=>user.username === username)
        // const userRole = users.find((user)=>user.user_type === 
        // console.log(userFound.password);
        if (!userFound) {
            return res.status(403).json({msg: 'USER DOES NOT EXIST, KINDLY SIGN UP '})
        }
        // if (userFound.user_type !='admin') {
        //     return res.status(403).json({msg: 'USER DOES NOT HAVE ACCESS TO THE RESOURCE'})
        // }

    } catch (error) {
        console.log(error);
    }
    next()
}


module.exports = authUser