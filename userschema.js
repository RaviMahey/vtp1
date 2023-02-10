const express = require('express');
// const model = express();
const router = express.Router();
const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userschema = new mongoose.Schema({
    name: {
        type:String,
        required:true},
    email: {
        type:String ,
        required: true},
    password: {
        type:String,
        requred:true
    } ,
    tokens:[
        {
            token:{
                type: String
            }
        }
    ]   

  });

userschema.pre('save',async function(next){
    console.log("bycript");
    if(this.isModified('password')){
        const gs= process.env.SALT;
        this.password=await bcrypt.hash(this.password,parseInt(gs));
    }
    next();
})
userschema.methods.gentok = async function gentok(){
    try{
        let jtoken=  jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:jtoken});
        await this.save();
        return jtoken;
    }
    catch(err){
        console.log(err);
    }

}
const user= mongoose.model('user',userschema);

module.exports = user;