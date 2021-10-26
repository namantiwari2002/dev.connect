//////storing the secret keys

module.exports={

    mongodb:{
        dbURI:'db uri here'
        //mongodb://<dbuser>:<dbpassword>@ds037997.mlab.com:37997/passport-outlook-auth
    },

    session:{
        cookieKey:'userCredentials'
    },
    outlook:{
        clientID: 'client id here',
        clientSecret: 'secret here'
    }


};