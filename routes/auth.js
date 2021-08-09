const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const {check,validationResult} = require('express-validator');

const User = require('../models/User');

//Validate the logged in user
//@route          GET api/auth 
//@desc           Get logged in user
//@access         Private
router.get('/',(req,res)=>{
    res.send('Get Logged in User');
});

//Authenticating the user
//@route          POST api/auth 
//@desc           Auth user & get token
//@access         Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required.').exists()   
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //Pull the email & password
    const { email, password }=req.body;
    try{
        //Find a user by its email
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid Password'});
        }
        const payload = {
            user: {
                //With user id i can acess all the contacts the logged in user has
                id: user.id
            }
        }

        jwt.sign(payload,
            config.get('jwtSecret'),
            {
             expiresIn: 36000
            },
         (err,token)=>{
            if(err) throw err;
            res.json({token});
         }
        );
    }catch(err){
        console.log(err.message);
        return res.status(400).json({msg:'Server Error'});
    }    
    //res.send('Get logged in a user');
});



module.exports = router;