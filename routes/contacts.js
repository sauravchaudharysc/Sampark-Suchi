const express = require('express');
const router = express.Router();

//@route          Get api/contacts 
//@desc           Get all users contacts
//@access         Private
router.get('/',(req,res)=>{
    res.send('Get all contacts of a user');
});

//@route          POST api/contacts 
//@desc           Add new user contacts
//@access         Private
router.post('/',(req,res)=>{
    res.send('Add contacts');
});

//@route          PUT api/contacts/:id 
//@desc           Update contact contacts
//@access         Private
router.put('/:id',(req,res)=>{
    res.send('Update contact');
});

//@route          Delete api/contacts/:id 
//@desc           Delete contact contacts
//@access         Private
router.delete('/:id',(req,res)=>{
    res.send('Delete contact');
});

module.exports = router;