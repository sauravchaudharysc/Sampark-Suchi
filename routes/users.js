const express = require('express');
const router = express.Router();
//@route          Get api/contacts 
//@desc           Get all users contacts
//@access         Private
router.post('/',(req,res)=>{
    res.send('Register a user');
});


module.exports = router;