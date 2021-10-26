const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let userSchema=new Schema({
    
   
    profile_id:{type: String,required:false},
    headline:{type:String , required:false},
    link:{type:String , required:false},
    content:{type:String , required:false},
    date:{type:Date , required:false}

});



const User=mongoose.model('userPost',userSchema);

module.exports=User;