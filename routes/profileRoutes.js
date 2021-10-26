var express = require('express');
var router = express.Router();


const UserModel=require('../models/user-model');
const ProfileController=require('../controllers/profile');




router.get('/',ProfileController.authCheck,ProfileController.profilePage);
router.post('/',ProfileController.updateProfile);
router.post('/pic',ProfileController.updatePic);

  

/* GET users listing. */


module.exports = router;
