'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const servicesLogin = require('./app/login/routers');
const firebase = require('firebase');

const config = require('./config');
firebase.initializeApp(config.firebaseConfig);

 const auth = firebase.auth();



const app = express();

app.use(bodyParser.json());
app.listen(3000);



app.get('/', (req, res) => {
  res.status(200).send({message:'OK'});
});


app.post('/login', (req, res)=> {
  console.log(req.body);
  if(!req.body.email || !req.body.password) {
    res.status(400).send({message: 'Error in the params'});
  } else {
     const token = servicesLogin.loging(req.body.email, req.body.password);
     console.log(token);
   
  }
  
});
module.exports={auth}


