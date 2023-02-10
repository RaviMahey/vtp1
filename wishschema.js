const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
 const wishschema = new mongoose.Schema({
    id:String,
    wisharray: [""]
 });
 const wishlist = mongoose.model('wishlist',wishschema);
 module.exports = wishlist;