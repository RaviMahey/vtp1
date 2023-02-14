const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
 const orderschema = new mongoose.Schema({
    id:String,
    orderarray: [{
      idf:String,
       symbol: String,
       quantity: Number,
       price : Number
    }
    ]
 });
 const order = mongoose.model('order',orderschema);
 module.exports = order;