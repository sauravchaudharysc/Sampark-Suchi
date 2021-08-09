const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {check,validationResult} = require('express-validator');

const User = require('../models/User');

//@route          Get api/contacts 
//@desc           Get all users contacts
//@access         Private
router.post('/',[
    check('name','Please enter the name').not().isEmpty(),
    check('email','Please enter the email').isEmail(),
    check('password','Please enter the password of atleast 6 character').isLength({min:6})   
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //We get the name,email,password
    //res.send(req.body);

    //Pull the name,email & password
    const { name, email, password }=req.body;

    try{
        //Find a user by its email
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({msg:'User Already Exists'});
        }
        user = new User({
            name,
            email,
            password
        });

        //Encrypting the Password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);
        await user.save();
        res.send(user);
    }catch(err){
        console.log(err.message);
        return res.status(400).json({msg:'Server Error'});
    }
});


module.exports = router;