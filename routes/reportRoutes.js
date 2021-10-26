const express = require('express');
const report_router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user-model');
var nodemailer = require('nodemailer');


report_router.get('/report' , (req,res)=>{

    res.render('report');
  
  })
  
  report_router.post('/report',(req,res,next)=>{
    console.log(req.body)
    
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'iitg.dev.connect@gmail.com',//replace with your email
    pass: 'dev.connect123'//replace with your password
    }
    });
    
    var mailOptions = {
    from: 'iitg.dev.connect@gmail.com',//replace with your email
    to: 'iitg.dev.connect@gmail.com',//replace with your email
    subject: `dev.Connect Profile Report`,
    html:`<h1>Details</h1>
    <h2> Profile:${req.body.p_id} </h2><br>
    <h3> Reason:${req.body.reason} </h3><br>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    res.send(error) 
    }
    else {
    res.render('reported');
    }
    });
    })

    module.exports = report_router;