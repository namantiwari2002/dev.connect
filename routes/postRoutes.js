const express = require('express');
const post_router = express.Router();
const mongoose = require('mongoose');
const UserPost = require('../models/post-model');
const User = require('../models/user-model');
var nodemailer = require('nodemailer');


post_router.get('/post_activity' , (req,res)=>{

    
          //if logged in
          res.render('post_act' , {user:req.user});
      

});

post_router.get('/activities/:p_id' , (req,res)=>{

    
    UserPost.find({profile_id : req.params.p_id }).then((result)=>{
       
        res.render('activities' , {result:result , user_id:req.params.p_id});
    }).catch((err)=>{
        console.log(err);
        res.render('error' , {err});
    })
    

})

post_router.get('/activity/:p_id' , (req,res)=>{

    
    UserPost.findById(req.params.p_id ).then((result)=>{
       
        res.render('activity' , {result:result});
    }).catch((err)=>{
        console.log(err);
        res.render('error' , {err});
    })
    

})

post_router.get('/latest' , (req,res)=>{

    
    UserPost.find({}).sort({_id:-1}).limit(25).then((result)=>{
       
        res.render('latest' , {result:result});
    }).catch((err)=>{
        console.log(err);
        res.render('error' , {err});
    })
    

})

post_router.post('/post_activity' , (req,res)=>{

    var todayDate = new Date().toISOString().slice(0, 10);



    new UserPost({

        profile_id:req.user.profile_id,
        headline:req.body.headline,
        link:req.body.link,
        content:req.body.content,
        date:todayDate


    }).save().then((newUser=>{

       User.findOneAndUpdate(
                {profile_id : req.user.profile_id} , 
                { $inc: { posts: 1} }
            )
                .then((data1) => {
                   res.render('act_posted');
                })
                .catch((err1) => {
                });

    }));

})

module.exports = post_router;