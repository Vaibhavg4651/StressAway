import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import guser from "../models/googleUser.js";
import fuser from "../models/facebookUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendemail.js";
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import passport from "passport";


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
    .status(400)
    .json({ message: "please provide email and password" });
  }
  const Email = email.toLowerCase();

  const user = await User.findOne({ email: Email });
  if (user === null) {
    throw new Error("Invalid  email or password");
  } else {
    const validate = await bcrypt.compare(password, user.password);
    if (validate) {
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1hr",
      });
      res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ success: true, message: user, token: token });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
});
const logout = asyncHandler(async (req, res) => {
    res.clearCookie("token" , {path: "/" , httpOnly: true , sameSite: "none" , secure: true, expires: new Date(0)});
    res.cookie.token = "";
    res.status(200).json({ success: true, message: "logout successfully" });
  });

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password , institution, age } = req.body;
  if (!email || !name || !password) {
    throw new Error("provide all details during registeration ...");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const Email = email.toLowerCase();

  const newUser = new User({
    name: name,
    email: Email,
    password: hashedpassword,
    institution: institution,
    age: age,
    mood:[{"mood":"time"}],
    test:[{"time":"test"}]
  });
  const user = await newUser.save();
  sendEmail(req.body.email , req.body.name);
  res.status(200).json({ success: true, message: user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json({ success: true, message: users });
});

const updatePassword = asyncHandler(async (req, res) => {
  const { email, newpassword ,conpassword } = req.body;
  if (!email || !newpassword || !conpassword) {
    throw new Error("provide all details correctly...");
  }
  const Email = email.toLowerCase();
  console.log(Email);

  try {
    const document = await User.findOne({ email: Email });
    if (document) {
      // Document was found
      const hashedpassword = await bcrypt.hash(req.body.newpassword, 10);
      await User.findOneAndUpdate(
        { email: Email }, // Find the document using the specified field
        { $set: { password: hashedpassword } }, 
        { new: true } 
      );
    }
    res.status(200).json({ success: true, message: "Password updated" });
  } catch (error) {
    console.error('User not found :', error);
  }
});
// @desc    Put user by ID
// @route   Put /api/user/:id

const getUserById = asyncHandler(async (req, res) => {
  const { id, newValue , check } = req.body;
  if(check === "User"){
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { mood: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
} if(check === "guser"){
  try {
    const user = await guser.findByIdAndUpdate(
      id,
      { $push: { mood: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
} if(check === "fuser"){
  try {
    const user = await fuser.findByIdAndUpdate(
      id,
      { $push: { mood: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
}
});


const updateTest = asyncHandler(async (req, res) => {
  const { id, newValue , check } = req.body;
  if(check === "User"){
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { test: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
} if(check === "guser"){
  try {
    const user = await guser.findByIdAndUpdate(
      id,
      { $push: { test: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
} if(check === "fuser"){
  try {
    const user = await fuser.findByIdAndUpdate(
      id,
      { $push: { test: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
}

});

  const verifyCallback = async(accessToken, refreshToken, profile, done) => {
    const newUser = new guser( {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      mood:[{"mood":"time"}],
      test:[{"time":"test"}],
    })
    try {
      let user = await guser.findOne({ googleId: profile.id })

      if (user) {
        done(null, user)
      } else {
        user = await newUser.save();
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
      }

      const verifyCallback2 = async(accessToken, refreshToken, profile, done) => {
        const newUser = new fuser( {
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.email || " ",
          mood:[{"mood":"time"}],
          test:[{"time":"test"}],
        })
        try {
          let user = await fuser.findOne({ facebookId: profile.id })
    
          if (user) {
            done(null, user)
          } else {
            user = await newUser.save();
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
          }
    
          const GOOGLE_CLIENT_ID = "773420280742-nbhh65mk41sjs6pili1idhgunuoskotq.apps.googleusercontent.com" ;
          const Facebook_CLIENT_ID = "2412922625549226" ;
          const GOOGLE_CLIENT_SECRET ="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";
          const Facebook_CLIENT_SECRET ="d5a6e2d61f7edb6af5e8019f6f7fdbda";

passport.use( new GoogleStrategy({
  clientID:GOOGLE_CLIENT_ID,
  clientSecret:GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},  verifyCallback
  ));

  passport.use( new FacebookStrategy({
    clientID:Facebook_CLIENT_ID,
    clientSecret:Facebook_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback"
  },  verifyCallback2
    ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async(id, done) => {
    try {
      const user = await guser.findById(id);
      if (user) {
        done(null, user);
      } else {
        // If the user is not found in the guser model, try finding in the fuser model
        const facebookUser = await fuser.findById(id);
        done(null, facebookUser);
      }
    } catch (err) {
      done(err, null);
    }
  });

export { authUser, registerUser,logout, getUsers, getUserById, updateTest, updatePassword};
