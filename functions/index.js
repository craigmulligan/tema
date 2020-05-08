const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')
admin.initializeApp()

const app = express()
const db = admin.firestore()

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))
// Add middleware to authenticate requests
// build multiple CRUD interfaces:
app.get('/', (req, res) => res.send(JSON.stringify({ message: 'hii!' })))
app.post('/messages', (req, res) => {
  // do stuff
  const { userId, threadId, ...rest } = req.body

  const msg = {
    ...rest,
    userRef: db.collection('users').doc(userId),
    threadRef: threadId
      ? db.collection('threads').doc(threadId)
      : db.collection('threads').doc()
  }

  // TODO make this async
  db.collection('messages').add(msg)
  res.statusCode(201).send(JSON.stringify(msg))
})

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app)
