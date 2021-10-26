const express = require('express');
const search_router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user-model');

search_router.post('/search' , (req,res)=>{

    const regex = new RegExp(escapeRegex(req.body.search), 'gi');
    
    User.find({ $text: { $search: regex } }).then((result)=>{
       
        res.render('search' , {result:result , tag:req.body.search});
    }).catch((err)=>{
        console.log(err);
        res.render('error' , {err});
    })
    

})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = search_router;