const express= require('express');
const mongoose = require('mongoose');
const router= express.Router();
// const dotenv= require('dotenv');
// dotenv.config({path:'./config.env'});
const DB=process.env.DATABASE;
mongoose.set('strictQuery', true)
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DATABASE);
  console.log("connect throug conn");
}
module.exports= router;