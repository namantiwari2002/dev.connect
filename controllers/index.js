var express = require('express');
var UserModel = require('../models/user-model.js');


var indexPage= (req, res)=> {

  res.render('index' , {user:req.user});
//   UserModel.find({}).then((result)=>{
//     
// }).catch((err)=>{
//     res.render('error');
// })

  };
  
module.exports = {
    indexPage
    };
  
  