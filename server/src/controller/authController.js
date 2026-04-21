const userModel = require("../models/user")
const blacklistModel = require("../models/blacklist")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerUser(req,res) {
    const {username,email,password} = req.body

    if(!username || !email || !password) {
        return res.status(400).json({
            message : "All fields are required"
        })
    }

    const isUserExist = userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if(isUserExist) {
        return res.status(400).json({
            message : "User already exists"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password : hash
    })

    const token = jwt.sign({id : user._id , username : user.username},process.env.JWT_SECRET,{
        expiresIn : "1d"
    })

    res.cookie("token",token);

    return res.status(201).json({
        message : "User registered successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })

}

async function loginUser(req,res) {
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if(!user) {
        return res.status(409).json({
            message : "User not Found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid) {
        return res.status(409).json({
            message : "Invalid credentials"
        })
    }

    const token = jwt.sign({id : user._id , username : user.username},process.env.JWT_SECRET,{
        expiresIn : "1d"
    })

    res.cookie("token",token);

    return res.status(200).json({
        message : "User logged in successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

async function logoutUser(req,res) {
    const token = req.cookies.token;

    if(token) {
        await blacklistModel.create({token})
    }

    res.clearCookie("token");
    
    return res.status(200).json({
        message : "User logged out successfully"
    })
}

async function getMe(req,res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "user fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}