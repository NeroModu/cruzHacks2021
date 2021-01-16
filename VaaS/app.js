'use strict';

// [START gae_node_request_example]
const express = require('express');
const crypto = require('crypto');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

app.get('/hash/:id', (req, res) => {
    let secret = req.params.id;

    let hash = crypto.createHmac("sha256", "thisismysecretkey").update(secret).digest("hex");

    res.status(200).send(hash).end;
});



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;

