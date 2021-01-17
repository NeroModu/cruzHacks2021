'use strict';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('910587914066-a79tgllt99stia0bqfihhhbf4vb3u812.apps.googleusercontent.com');

// [START gae_node_request_example]
const contractHandler = require('./contractHandler.js');
const express = require('express');
const crypto = require('crypto');
const hmac = "asjdhg374y3uiewh";
const cors = require('cors');

const app = express();


// var whitelist = ['http://localhost8080', 'https://cruzhacks2021-301707.wl.r.appspot.com', 'https://8080-cs-286288504737-default.us-west1.cloudshell.dev']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.get('/hash/:id', (req, res) => {
    let secret = req.params.id;

    let hash = crypto.createHmac("sha256", hmac).update(secret).digest("hex");

    res.status(200).send(hash).end;
});

app.get('/vote/', (req, res) =>{
    console.log(data);
});

app.get('/verifyandvote/', (req, res) =>{
    console.log("tokensignin");
    console.log(req);
    res.status(200).send("Hello").end;
    // res.status(200).send(req.data).end;

    // async function verify() {
    //     const ticket = await client.verifyIdToken({
    //         idToken: token,
    //         audience: '910587914066-a79tgllt99stia0bqfihhhbf4vb3u812.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
    //         // Or, if multiple clients access the backend:
    //         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    //     });
    //     const payload = ticket.getPayload();
    //     const userid = payload['sub'];
    //     // If request specified a G Suite domain:
    //     // const domain = payload['hd'];
    // }
    // verify().catch(console.error);
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]


module.exports = app;

