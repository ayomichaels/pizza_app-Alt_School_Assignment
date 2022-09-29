const User = require('../models/userModel')


// I'm trying to have an authentication that'll search through the USER collection and of the user type is admin, grant access to the user to access the order routes
const authUser = async (req,res,next) =>{
    try {
        const {username, password} = req.body
        console.log(username);
        // const userFound = await User.find((user)=>user.username === username)
        // console.log(`this should be the USER ${userFound}`);
        
        
        // if (!username) {
        //     return res.status(403).json({msg: "access denied"})
        // }
        const users = await User.find()
        const userFound = users.find((user)=>user.username === username)
        if (!userFound) {
            return res.status(403).json({msg: 'USER DOES NOT EXIST'})
        }
        console.log(userFound);

    } catch (error) {
        console.log(error);
    }
    

    // if (!userFound) {
    //     return res.status(403).json({msg: "access denied"})
    // }
    

    next()
}

module.exports = authUser