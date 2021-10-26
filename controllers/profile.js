
var UserModel=require('../models/user-model');
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


var Storage = multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req , file , cb) => {
    cb(null , file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }

 })

 var upload = multer({
   storage:Storage
 }).single('profile_pic');


//this fun is to check if,someone is logged-in in the page, if yes, redirect to profile page, else redirect to login page
//middleware function, that's gonna set in before profile page is redirected
var authCheck=(req,res,next)=>{
    if(!req.user){
      //if user isn't logged in 
      res.redirect('/');
 
    }
    else{
      //if logged in
     next();
    }
 };


 
 var profilePage= (req, res)=> {
  
var user=req.user;

var id=user._id;
  UserModel.findById(id).then(function(results){
          
        var percent = 0;

        if(user.profile_pic != "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=192&d=mm"){
          percent += 20;
        }

        if(user.connect != "NULL" && user.connect != "null" && user.connect != "Null"){
            percent += 10; 
        }

        if(user.about != "NULL" && user.about != "null" && user.about != "Null"){
          percent += 20; 
      }

    if(user.interests != "NULL" && user.interests != "null" && user.interests != "Null"){
      percent += 10; 
  }

  if(user.stack != "NULL" && user.stack != "null" && user.stack != "Null"){
    percent += 20; 
}

if(user.technologies != "NULL" && user.technologies != "null" && user.technologies != "Null"){
  percent += 20; 
}

          res.render('profile',{user:user , percent:percent});
 }
);
};

var updateProfile= (req,res) => {

var user = req.user;


    UserModel.findOneAndUpdate(
        {_id : user._id} , 
        {$set: {
  
         
          branch:req.body.branch,
          year:req.body.year,
          about:req.body.about,
          connect:req.body.connect,
          github:req.body.github,
          interests:req.body.interests,
          stack:req.body.stack,
          technologies:req.body.technologies,
          busy : req.body.busy,
          bit: 1
  
        }}
    )
        .then((data) => {
            res.render('updated')
        })
        .catch((err) => {
          console.log(err);
            res.render('error' , {err});
        });
 

};

var updatePic= (req,res) => {

  var user = req.user;
  
  var pic = "uploads/" + req.file.filename;
  
      UserModel.findOneAndUpdate(
          {_id : user._id} , 
          {$set: {
    
            profile_pic:pic,
            bit: 1
    
          }}
      )
          .then((data) => {
              res.render('updated')
          })
          .catch((err) => {
            console.log(err);
              res.render('error' , {err});
          });
   
  
  };








 module.exports = {
  authCheck,
  profilePage,
  updateProfile,
  updatePic
  
  };

