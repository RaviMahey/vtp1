const { json } = require('express');
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config({path:'./config.env'});
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const port = process.env.PORT || 5000;
const path =require('path');
// const path =require('path');

app.use(express.json());

app.use(require('./conn'));
app.use(require('./auth'));
app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});
// console.log("yes");
app.get('/logout',(req,res)=>{
  console.log("reached");
  res.clearCookie("jwtoken",{path:'/'});
  res.status(200).send("user logout");
  // req.user.save();
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})