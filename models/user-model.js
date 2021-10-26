const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let userSchema=new Schema({
    
    outlookId: {type: String,required:true},
    username:{type: String,required:false},
    email:{type: String,required:false},
    profile_pic:{type:String , required:false},
    branch:{type:String , required:false},
    year:{type:Number , required:false},
    about:{type:String , required: false},
    connect:{type:String , required:false},
    profile_id:{type: String,required:false},
    interests:{type: String,required:false},
    stack:{type: String,required:false},
    technologies:{type: String,required:false},
    busy:{type:Number , required: false},
    bit:{type:Number , required: false},
    stars:{type:Number , required:false},
    people:{type:Number , required:false},
    rated_people:{type:Array , required:false},
    posts:{type:Number , required:false},
    github:{type:String , required:false}

});

userSchema.index({stack:"text", technologies:"text" , username:"text",});



const User=mongoose.model('user',userSchema);

module.exports=User;