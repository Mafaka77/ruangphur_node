const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user_model");
const Role = require("../../models/role_model");
exports.createAdmin = async (req, res) => {
    const { email, password } = req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(200).json({error:"User already exists",status:400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const adminRole = await Role.findOne({ name: "Admin" });
        user = new User({
            email,
            password: hashedPassword,
            roles: [adminRole._id],
        });
        await user.save();
        return res.status(200).json({message:"Admin created successfully",status:201});
    }catch (e) {
        return res.status(200).json({error:e.message,status:500});
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email }).populate("roles", "-__v");
        if (!user) {
            return res.status(200).json({message:"User not found",status:404});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({message:"Incorrect password",status:400});
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
    } catch (e) {
        return res.status(200).json({message:e.message,status:500});
    }
};
exports.getAuthUser = async (req, res) => {

    try {
       

        const user = await User.findById(req.user.user.id).populate("roles", "name").populate('district').select("-password -__v");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ data:user,status:200});
    } catch (error) {
        res.status(200).json({ message: error.message,status:500 });
    }
};