const functions = require('firebase-functions')
const express = require('express');
const cors = require('cors');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
// Add middleware to authenticate requests
// build multiple CRUD interfaces:
app.get('/', (req, res) => res.send(JSON.stringify({ message:'hii!' })));

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
