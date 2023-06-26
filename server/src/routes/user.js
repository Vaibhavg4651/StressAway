const router=require('express').Router()
const user=require('../models/user')
const varifyuser=require('../../middleweres/middlewere')



//get user
router.get('/profile',varifyuser,async (req,res)=>{
    try{
     
     const userdata=await user.findById(req.id)
     if(userdata){

        res.status(200).json({"success":tru-
        +e,"message":userdata})
    }

        else{
            res.status(401).json({"success":false,"message":"Not authorize"})
        }}catch(e){res.status(400).json({"success":"false","message":"some error occured","error":e.message})
    }})

//get all users
router.get("/getallusers",varifyuser,async (req,res)=>{
    try{
        let userdata  =  await user.find({})
        userdata=userdata.filter((elem)=>{ return elem._id!=req.id})
        res.status(200).json({"success":true,"message":userdata})
    }catch(e){res.json({"success":"false","message":"some error occured"})}
})


module.exports = router ;