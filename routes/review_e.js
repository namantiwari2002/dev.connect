const express = require('express');
const re_routes = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user-model');
const UserRating = require('../models/user-rating');

var prev = 0;

re_routes.get('/review_edit/:p_id' , (req , res) => {

    UserRating.findOne({profile_id : req.params.p_id , reviewer : req.user.profile_id} , (err , data) => {

        if(err){
            console.log(err);
            // res.render('error');
        }else{
            prev = data.rating;
            res.render('review_edit' , {data:data});
        }

    })

})

re_routes.post('/review_edit/:p_id' , (req , res) => {


    UserRating.findOneAndUpdate(
        {profile_id : req.params.p_id , reviewer : req.user.profile_id} , 
        {$set: {
             
          review:req.body.review,
          rating:req.body.rating
  
        }}
    )
        .then((data) => {

            var t = req.body.rating - prev;

            User.findOneAndUpdate(
                {profile_id :req.params.p_id} , 
                {$inc: { stars:t}
        
          
                }
            )
                .then((data1) => {
        
                    res.render('edited')
                })
                .catch((err) => {
                    console.log(err);
                    // res.render('error');
                });

        })
        .catch((err) => {
            console.log(err);
        });


})

module.exports = re_routes;