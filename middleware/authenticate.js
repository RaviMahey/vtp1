const jwt= require("jsonwebtoken");
const user= require('../userschema');
const Authenticate= async (req,res,next)=>{
    try{
        // con
        const token= req.cookies.jwtoken;        
        // console.log(token);
        const verifytoken= jwt.verify(token,process.env.SECRET_KEY);
        const rootUser= await user.findOne({_id:verifytoken._id,"tokens.token":token});
        console.log(verifytoken._id);
        if(!rootUser){
            throw new Error("User not found")
        }
        console.log("chaleyea");
        req.token= token;
        req.rootUser= rootUser;
        req.userId=rootUser._id;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).send('unauthorised:no token provided');
    }


}
module.exports=Authenticate;