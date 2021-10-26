const express = require('express');
const p_routes = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user-model');
const UserRating = require('../models/user-rating');

p_routes.get('/id/:p_id' , (req , res) => {

    User.findOne({profile_id : req.params.p_id} , (err , data) => {

        if(err){
            console.log(err);
            res.render('error' , {err});
        }else{
            res.render('id' , {data:data , user:req.user});
        }

    })

})

p_routes.post('/id/:p_id' , (req , res) => {

   new UserRating({

        profile_id:req.params.p_id,
        rating:req.body.rating,
        review:req.body.review,
        reviewer:req.user.profile_id

   }).save().then((newRating=>{
    
    User.findOneAndUpdate(
        {profile_id : req.params.p_id} , 
        { $inc: { stars: req.body.rating , people: 1} }
    )
        .then((data) => {
           
            User.findOneAndUpdate(
                {profile_id : req.user.profile_id} , 
                { $push: {rated_people : req.params.p_id} }
            )
                .then((data1) => {
                   
                    
                    
                    res.render('rated' , {user_id : req.params.user_id} )
                })
                .catch((err1) => {
                    // res.render('error');
                    console.log("Error");
                });
        
            
        
        })
        .catch((err) => {
            // res.render('error');
            console.log("Error");
        });

    
    //  res.render('/rating_done');

}));

})

module.exports = p_routes;