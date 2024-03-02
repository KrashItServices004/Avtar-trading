const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next)=>{
    const token = req.cookies.token;
// console.log(token);
    if(!token){
        return next(new Errorhandler('Please Login to access this resources', 401))
    }

    const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    req.user = await User.findById(decodedData.id)
    
    next()
})

exports.authorizeRoles = (...roles)=>{

    return (req, res, next)=>{
       
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler(`Role: ${req.user.role} is not allowed to access this resources`, 403))
        }

        next();
    }

}