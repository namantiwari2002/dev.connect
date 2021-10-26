const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let userSchema=new Schema({
    
   
    profile_id:{type: String,required:false},
    rating:{type:Number , required:false},
    reviewer:{type:String , required:false},
    review:{type:String , required:false}

});



const User=mongoose.model('userRating',userSchema);

module.exports=User;