const express = require('express');
const rating_router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user-rating');

rating_router.get('/reviews/:p_id' , (req,res)=>{

    
    User.find({profile_id : req.params.p_id }).then((result)=>{
       
        res.render('reviews' , {result:result , pid:req.params.p_id});
    }).catch((err)=>{
        console.log(err);
        res.render('error' , {err});
    })
    

})


module.exports = rating_router;