const { json } = require('express');
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config({path:'./config.env'});
const cookieParser = require('cookie-parser');
app.use(cookieParser())
const port = process.env.PORT  || 5000;
const path =require('path');
app.use(express.json());

app.use(require('./conn'));
app.use(require('./auth'));
// console.log("yes");
app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

app.get('/logout',(req,res)=>{
  console.log("reached");
  res.clearCookie("jwtoken",{path:'/'});
  res.status(200).send("user logout");
  // req.user.save();
});
// if(process.env.NODE_ENV==="production"){
//   app.use(express.static("client/build"));
//   app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
// }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})