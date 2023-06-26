import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Order from "../models/orderModel.js";
import sendEmail from "../../utils/sendemail.js";
import crypto from "crypto"
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const verifyEmail=asyncHandler(
  asyncHandler(async(req,res)=>{
   const user=await User.findOne({"VerficationCode":req.body.code});
   console.log(user)
   if(user!==null){
    await User.updateOne({"VerficationCode":req.body.code},{"isVerified":true });
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10hr",
    });
    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 36000),
      httpOnly: true,
      sameSite: "none",
      secure:true
    });
    res.status(200).json({ success: true, message: user, token: token });
  
   }else{
    res.status(200).json({"success":false,"message":"wrong VerificationCode provided"})
   }
  })
)
const authUser = asyncHandler(
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: req.body.email });
    if (user===null) {
      throw new Error("Invalid  email or password");
    } else {
      const validate = await bcrypt.compare(req.body.password, user.password);
      if (validate) {
      if(user.isVerified===false){
        const code=crypto.randomBytes(32).toString('hex')
      const u=  await User.updateOne({"email":req.body.email},{"VerficationCode":code })
        sendEmail(req.body.email,code)
        res.status(200).json({ success: false, message: "EMAIL IS SENT TO YOUR EMAILID , PLEASE VERIFY" });

      }else{
        const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "10hr",
        });
        res.cookie("token", token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 36000),
          httpOnly: true,
          sameSite: "none",
           secure:true
        });
        res.status(200).json({ success: true, message: user, token: token });
      } 
    }else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    }
  })
);
const logout = asyncHandler(
  asyncHandler(async (req, res) => {
    res.clearCookie('token')
    req.cookies.token=''
    res.status(200).json({"success":true ,"message":"logout successfully"})
      })
);
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new Error("provide all details during registeration ...");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const code=crypto.randomBytes(32).toString('hex')

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
    VerficationCode:code
  });


  const user = await newUser.save();
  sendEmail(req.body.email,code)
  res.status(200).json({"success":true,"message":user})
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      "success":true,"message":user });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    var hashedpassword=user.password;
    if (req.body.password) {
       hashedpassword = await bcrypt.hash(req.body.password, 10);

    }
 
  const t=await User.findByIdAndUpdate(req.user._id,{
        name:req.body.name,
        password:hashedpassword})

    res.json({
      success: true,
      message: t,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt : -1});
  res.json({"success":true,"message":users});
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const orders=await Order.find({"user":req.params.id});
  orders.forEach(async(elem)=>{
    elem.orderItems.forEach(async(elem)=>{
      await Product.findByIdAndUpdate(elem._id,{ $pull: { purchasedUsers: req.params.id }})
    })
  })

  if (user) {
   await Order.deleteMany({"user":req.params.id})
    await user.remove();
    res.json({"success":true, "message": "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const user = await User.findOne({"_id" : req.params.id}).select("-password");
 console.log(user)
  if (user) {
    res.json({"success":true,"message":user});
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({"success":true,"message":updateUser });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  logout,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyEmail
};
