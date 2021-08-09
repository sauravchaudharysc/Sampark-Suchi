 const jwt = require('jsonwebtoken');
 const config = require('config');

 //Middle Ware Function
 module.exports = function(req,res,next) {
     //Get token from header
     const token = req.header('x-auth-token');

     //check if not token 
     if(!token){
         //Helps in Protecting Protected Routes
         return res.status(401).json({msg:'No token,Authorization Denied'});
     }

     //If there is a token 
     try{
      //verify the token & pull out the payload
      const decoded = jwt.verify(token,config.get('jwtSecret'));
      //Extract the user from entire payload
      req.user=decoded.user;
      next();
     }catch(err){
        res.status(401).json({msg:'Invalid Token'});
     }
 };