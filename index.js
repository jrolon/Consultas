const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const admin = require('firebase-admin');
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

// Add the Firebase products that you want to use
require('firebase/firestore');

const config = require('./config');

admin.initializeApp(config.firebaseConfig);
firebase.initializeApp(config.firebaseConfig);
const firebaseAuth = firebase;
const app = express();

app.use(bodyParser.json());
app.listen(3000);


app.get('/', (req, res) => {
  res.status(200)
    .send({ message: 'OK' });
});


app.post('/login', (req, res) => {
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400)
      .send({ message: 'Error in the params' });
  } else {
    firebaseAuth.auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password)
      .then((response) => {
        response.user.getIdTokenResult()
          .then((value) => {
            res.status(201)
              .send({
                token: value.token,
                expiret: value.expirationTime
              });
          });

      })
      .catch((err) => {
        // return JSON.stringify(err);
      });
  }
});

app.post('/saveConductores', (req, res) => {
  admin.auth()
    .verifyIdToken(req.body.token)
    .then((val) => {
      const referencia = admin.database.ref('companies');
      console.log(referencia);
    })
    .catch((err) => {
      res
        .status(404)
        .send({ message: 'error realizando la consulta' });
    });

});
