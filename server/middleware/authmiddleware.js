import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../src/models/user.js'

const protect = asyncHandler(async (req, res, next) => {
  const cookie=req.cookies.token;
    if(!cookie){
      throw new Error('token not found')
    }
     jwt.verify(String(cookie),process.env.SECRET_KEY,async(err,user)=>{
        if(err){
          throw new Error('invalid token provided')
        }
        const u=await User.findOne({"_id":user._id});
        req.user=u;
        next()
    }
    )
})

export { protect }