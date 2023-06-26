const router=require('express').Router()
const users=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const axios=require('axios')

//register
router.post('/register',async (req,res)=>{
  try{
    if(req.body.username && req.body.email && req.body.password){


      const cu=await users.findOne({username:req.body.username})
      const ce=await users.findOne({email:req.body.email})
      const hashedpassword=await bcrypt.hash(req.body.password,10)
 

      if (cu || ce){res.status(200).json({"success":false,"message":"username or email already exist"})}
     else  if(!cu && !ce){
      
      const newUser=new users   ({
        username:req.body.username,
        email:req.body.email,
        password:hashedpassword,
      })

      const user=await newUser.save()
      const token= await jwt.sign({_id:user.id},process.env.SECRET_KEY,{expiresIn:"5hr"})
      res.cookie("pas",token,{
          path:"/",
          expires: new Date(Date.now()+1000*18000),
          httpOnly:true,
          sameSite:"lax",  
      })
      res.status(200).json({'success':true,'message':user})}

    }}
     
  catch(e){res.status(400).json({"success": false,"message":"user not created ","error":e.message})}
})


//login
router.post('/login',async (req,res)=>{
  try{
  const user=await users.findOne({email:req.body.email})
  !user && res.status(200).json({"success":false,"message":"incorrect details provided"})
 if(user){ 
    const validate=await bcrypt.compare(req.body.password,user.password)
     if(validate) {
       try{
    const token= await jwt.sign({_id:user.id},process.env.SECRET_KEY,{expiresIn:"5hr"})
    res.cookie("pas",token,{
        path:"/",
        expires: new Date(Date.now()+1000*18000),
        httpOnly:true,
        sameSite:"lax",

    })
    res.status(200).json({"success":true,"user": user,"token":token})
     }catch(e){console.log(e)}} 
 else{ res.status(200).json({"success":false,"message":"incorrect details provided"})}   
 }

  }catch(e){res.status(400).json({"success":false,"message":"some error occured","error":e.message  })}
})

//logout

router.post('/logout',async (req,res)=>{
  const cookie=req.cookies.pas;
    if(!cookie){
        return  res.status(400).json({"success":false,"message":"token not provided"})
    }
    const isvarify=await jwt.verify(String(cookie),process.env.SECRET_KEY,(err,user)=>{
        if(err){
            res.status(400).json({"success":false,"message":"invalid token provided"})
        }
        res.clearCookie('pas')
        req.cookies.pas=''
        res.status(200).json({"success":true ,"message":"logout successfully"})
    }
    
    )
})

module.exports=router;