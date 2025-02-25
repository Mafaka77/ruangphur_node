const Role = require('../../models/role_model');
const User=require('../../models/user_model')
const bcrypt = require("bcryptjs");
exports.users= async (req, res) => {
  let { page = 1, limit = 10, search = "", sortField = "name", sortOrder = "asc" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  // Sorting logic
  const sort = {};
  sort[sortField] = sortOrder === "asc" ? 1 : -1;

  // Filtering logic
  const filter = search
    ? { $or: [{ name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }] }
    : {};

  // Fetch data
  const users = await User.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).populate('roles').populate('district');
  const total = await User.countDocuments(filter);

  res.json({ users, total });
};
exports.getRoles=async(req,res)=>{
    try{
        const role=await Role.find();
        return res.status(200).json({data:role,status:200});
    }catch(ex){
         return res.status(200).json({message:ex.message,status:500});
    }
}
exports.submitUser=async(req,res)=>{
    const {data}=req.body;
    try{
        const district=data.district.map((e)=>e._id);
    const mobile=await User.findOne({mobile:data.mobile});

    if(mobile){
        return res.status(200).json({message:'User already exists',status:400});
    }
    if(!data.full_name || !data.email || !data.mobile ||!data.roles.length){
         return res.status(200).json({message:'All fields are required',status:400});
    } 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const newUser=new User({
            full_name:data.full_name,
            email:data.email,
            password:hashedPassword,
            mobile:data.mobile,
            district:district,
            roles:data.roles
        })
        await newUser.save();
        return res.status(200).json({message:'User Created',status:201})
    }catch(ex){
        return res.status(200).json({message:ex.message,status:500})
    }
}

exports.editUser = async (req, res) => {
    const { data } = req.body;
    
    try {
        // Check if user exists
        const user = await User.findById(data._id);
        if (!user) {
            return res.status(200).json({ message: "User not found", status: 404 });
        }

        // Validate required fields
        if (!data.full_name || !data.email || !data.mobile || !data.roles.length) {
            return res.status(200).json({ message: "All fields are required", status: 400 });
        }

        // Convert district to array of IDs
        const district = data.district.map(e => e._id);

        // Update user fields
        user.full_name = data.full_name;
        user.email = data.email;
        user.mobile = data.mobile;
        user.district = district;
        user.roles = data.roles;

        // Hash password only if it's provided
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(data.password, salt);
        }

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: "User updated successfully", status: 201 });
    } catch (ex) {
        return res.status(200).json({ message: ex.message, status: 500 });
    }
};

exports.deleteUsers = async (req, res) => {
    const { id } = req.params; // Extract ID from request params
console.log(id)
    try {
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(200).json({ message: "User not found", status: 404 });
        }

        // Delete user
        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully", status: 200 });
    } catch (ex) {
        return res.status(200).json({ message: ex.message, status: 500 });
    }
};


