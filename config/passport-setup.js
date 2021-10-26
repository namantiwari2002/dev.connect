const passport=require('passport');
const keys=require('./keys');
const User=require('../models/user-model');
const OutlookStrategy=require('passport-outlook');

passport.serializeUser((user,done)=>{
    done(null,user.id);

});

///deserializing

passport.deserializeUser((id,done)=>{
    
    User.findById(id).then((user)=>{
        done(null,user);

    });
    
});


passport.use(new OutlookStrategy({
            clientID: keys.outlook.clientID,
            clientSecret: keys.outlook.clientSecret,
            callbackURL: 'https://iitg-dev-connect.herokuapp.com/auth/outlook/callback'
           
          },
          function(accessToken, refreshToken, profile, done) {
            // console.log("Callback Function Fired from outlokk"+JSON.stringify(profile));
            // console.log("Username "+profile._json.DisplayName);
            // console.log("User Profile Id "+profile._json.Id);
            // console.log("User Profile mail "+profile._json.EmailAddress);
            
            
            var user = {
                outlookId: profile._json.Id,
                name: profile._json.DisplayName,
                email: profile._json.EmailAddress
                
               // accessToken:  accessToken
            };
            
               //check if user already exists in our db
               User.findOne({outlookId:user.outlookId}).then((currentUser)=>{
                if(currentUser){
                   //already hv d user
                   console.log('user is '+currentUser);
                   //serializing the user
                    done(null,currentUser);
                }
                else{
                    //if nt, create new user in db
                     
                     
                    
                    
                    var n  = user.email.indexOf('@');

                    var profile_id = user.email.slice(0 , n);
                      new User({
                 
                          outlookId:user.outlookId,
                          username:user.name,
                          email:user.email,
                          profile_id:profile_id,
                          profile_pic:'public/uploads/user_default2001.png',
                          branch:'NULL',
                          about:'NULL',
                          year: 1,
                          connect:'NULL',
                          interests:'NULL',
                          stack:'NULL',
                          technologies:'NULL',
                          busy: 0,
                          bit:0,
                          stars:0,
                          people:0,
                          rated_people : [" "],
                          posts:0,
                          github:'NULL'

                         

                         // profileImgLink:profile.image

                      }).save().then((newUser=>{
                          console.log('User Created '+newUser);
                          //res.render('/');

                          //again serializing

                           done(null,newUser);
                      }));
                      

                  }
            });
          
           
          }
        ));


