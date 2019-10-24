'use strict'
const {auth} = require('../../index');

 function  loging(email, password) {
     
     auth().signInWithEmailAndPassword(email, password)
                    .then( response => {
                        console.log(response.user.email);
                        return response.user.email;
                    }).catch((err) => {
                        //return JSON.stringify(err);
                    });
}

module.exports= { loging }
