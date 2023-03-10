const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
router.use(require('./conn'));
router.use(express.json());
const bcrypt = require('bcrypt');
const user = require('./userschema');
const Authenticate = require('./middleware/authenticate');
const wishlist = require('./wishschema');
const jwt = require("jsonwebtoken");
const { findOne } = require('./userschema');
const order = require('./orderschema');

router.post('/register', async (req, res) => {
    res.clearCookie('jwtoken');
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
        return res.res(422).json("fill properly");

    }
    const exists = await user.findOne({ email: email });
    // newuser.save();
    try {

        if (!exists) {
            // console.log(exists);
            // const ps = byc
            const newuser = new user({ name, email, password });

            const saveuser = await newuser.save();
            res.json({ mess: "save" });

        }
        else {
            console.log(exists);
            res.status(422).json({ mess: "userexists" });
        }


    }
    catch (err) {
        console.log(err);
        res.status(422).json(err);
    }

})
router.post('/login', async (req, res) => {

    try {
        res.clearCookie('jwtoken');
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json("fill user id or pass");
        }

        const exists = await user.findOne({ email: email });
        if (!exists) {
            // res.send();
            // console.log(exists);

            return res.status(422).json("invalid id or pass");
        }
        else {
            const isMatched = await bcrypt.compare(password, exists.password);
            // res.send("logn successfull");
            if (!isMatched) {
                return res.status(422).json("invalid id or pass");
            }
            const jtok = await exists.gentok();

            // res.cookie("ravi","thapa");
            res.cookie("jwtoken", jtok, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            // res.cookie()
            return res.json("login successfull");

        }

    }
    catch (err) {
        res.status(422);
        console.log(err);
    }

})
router.get('/dashboard', Authenticate, async (req, res) => {
    console.log("in dash fn");
    res.send(req.rootUser);
});
router.get('/wishlist', async (req, res) => {
    const token = req.cookies.jwtoken;
    const vid = jwt.verify(token, process.env.SECRET_KEY)._id;
    // console.log(vid);
    const getlist = await wishlist.findOne({ id: vid });
    if (!getlist || getlist === null) {
        const regiuser = new wishlist({ id: vid, wisharray: []});
        regiuser.save();
    }
    else {
        req.wishlist = getlist.wisharray;
        res.json(getlist.wisharray);
        // console.log("wishlist access");
    }

})
router.post('/addstock', async (req, res) => {
    console.log(req.body);
    const token = req.cookies.jwtoken;
    const vid = jwt.verify(token, process.env.SECRET_KEY)._id;
    // console.log(vid);
    const getlist = await wishlist.findOne({ id: vid });
    const {idf,symbol}=req.body;
    console.log(req.body)   ;
    if (getlist === null) {
        const regiuser = new wishlist({ id: vid, wisharray: [{idf,symbol}] });
        regiuser.save();
        return;
    }
    else  {     
        getlist.wisharray.push({idf,symbol});
        const w = await getlist.save();
    }
    req.list = getlist.wisharray;
    res.json(req.list);
})
router.post('/wishdelete', async (req, res) => {
    console.log("inside db wish del ");
    const token = req.cookies.jwtoken;
    const vid = jwt.verify(token, process.env.SECRET_KEY)._id;
    const getlist = await wishlist.findOne({ id: vid });
    // console.log(getlist.wisharray.index(2));
    getlist.wisharray.splice(parseInt(req.body.symbol),1);
    getlist.save();
    // console.log(getlist.wisharray);
    req.list = getlist.wisharray;
    res.json(req.list);


})
router.get('/orderlist', async (req, res) => {
    console.log(req.body);
    const token = req.cookies.jwtoken;
    const vid = jwt.verify(token, process.env.SECRET_KEY)._id;
    // console.log(vid);

    const getlist = await order.findOne({ id: vid });
    if (getlist === null) {
        // console.log("inside order list");
        const regiuser = new order({ id: vid});
        regiuser.save();
        req.list =  [];
    }
    else {
        req.list=getlist.orderarray;        
    }
    // console.log("inside order list", getlist.orderarray);
     res.json(req.list);
})
router.post('/addorder', async (req, res) => {
    console.log(req.body);
    const token = req.cookies.jwtoken;
    const vid = jwt.verify(token, process.env.SECRET_KEY)._id;
    const getlist = await order.findOne({ id: vid });
    const { idf, symbol, quantity, price } = req.body;   
    getlist.orderarray.push({ idf,symbol, quantity, price});
    const w =  getlist.save();    
    req.list = getlist.orderarray;
    res.json(req.list);
})
router.post('/delorder',async(req,res)=>{
    const token = req.cookies.jwtoken;
    const vid = jwt.verify(token, process.env.SECRET_KEY)._id;
    const getlist = await order.findOne({ id: vid });
    console.log(typeof(parseInt(req.body.idx)));
    getlist.orderarray.splice(parseInt(req.body.idx),1);
    getlist.save();
    req.list=getlist.orderarray;
    res.json(req.list);

})
module.exports = router; 
