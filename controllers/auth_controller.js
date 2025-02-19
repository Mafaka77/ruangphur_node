const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const Role = require("../models/role_model");

function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}
exports.sendOtp = async (req, res) => {
    const mobile=req.body.mobile;
    try{
        let otp=generateRandomNumber();
        let user=await User.findOne({mobile});
        const userRole = await Role.findOne({ name: "User" });
        if(user){
           await  user.updateOne({otp});
            return res.status(200).json({otp:otp,status:201,message:"OTP Successfully Sent"});
        }
        user = new User({
            mobile,otp,roles: [userRole._id],
        });
        await user.save();
        return res.status(200).json({otp:otp,status:201,message:"OTP Successfully Sent"});

    }catch (e) {
        return res.status(200).json({error:e.message,status:500});
    }
}
exports.verifyOtp = async (req, res) => {
    const {mobile,otp}=req.body;
    try{
        let user=await User.findOne({mobile}).select("-roles");
        if(!user){
            return res.status(200).json({message:"User not found",status:404});
        }
        if(user.otp!=otp){
            return res.status(200).json({message:"Incorrect OTP",status:400});
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) throw err;
                return res.status(200).json({token,status:200,user});
            }
        );
    }catch (e) {
        return res.status(200).json({message:e.message,status:500});
    }
};

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.user.id).select("-password -__v -roles");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ data:user,status:200});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};