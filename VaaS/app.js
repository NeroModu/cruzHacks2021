'use strict';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('910587914066-a79tgllt99stia0bqfihhhbf4vb3u812.apps.googleusercontent.com');

// [START gae_node_request_example]
const contractHandler = require('./contractHandler.js');
const bodyParser = require('body-parser');
const config = require('./config.js');
const express = require('express');
const crypto = require('crypto');
const hmac = config.hmac;
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function hashID(uid){
    return crypto.createHmac("sha256", hmac).update(uid).digest("hex");
}

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

//Gets the results of the poll straight from the smart contract
app.get('/results/', (req, res) => {
    
    contractHandler.getStandings().then((value) => {
        res.status(200).send(value).end;
    });
 
});

//verifies the token from the client is valid, then casts appropiate vote
app.post('/verifyandvote/', (req, res) =>{
    // console.log(req.body);
    let body = req.body;
    let token = body.token;
    let measure = body.result[0].measureID;
    let choice = body.result[0].vote;
    var hashedID;

    console.log(measure);
    console.log(choice);
    console.log(token);
    console.log(typeof choice);

    if(choice == false){
        choice = 0;
    }else if(choice == true){
        choice = 1;
    }

    async function writeVote(hashh){
        await contractHandler.castVote(hashh, choice);
    }

    //verify that the user is logged in . . . 
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '910587914066-a79tgllt99stia0bqfihhhbf4vb3u812.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        console.log(payload);
        console.log(userid);
        //hashedId = hashID(userid);
        return userid;
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
    }

    let verificationError = false;
    let contractError = false;
    let message = '';

    function sendResponse(){
        if(verificationError){
            message = "Verification Error";
        }else if(contractError){
            message = ("There was an issue writing your vote to the smart conttract! You probably already voted and can't vote again . . .");
        }else{
            message = hashedID;
        }
        res.status(200).send(message).end;
    }

    verify()
        .catch(console.log("VERIFICATION ERROR"), verificationError = true)
        .then((value) => {
            console.log("value(uid) = ", value), hashedID = hashID(value), await writeVote(hashedID)})
        .catch("ERROR WRITING TO CONTRACT", contractError = "true").then(
            console.log("success"), 
            sendResponse()
        );
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]


module.exports = app;

