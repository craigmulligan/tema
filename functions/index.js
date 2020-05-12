const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const app = express()
const { db } = require('./db')
const { createNotification, createUser } = require('./hooks')

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))
// Add middleware to authenticate requests
// build multiple CRUD interfaces:
app.get('/', (req, res) => res.send(JSON.stringify({ message: 'hii!' })))
app.post('/messages', async (req, res) => {
  const { userId, threadId, ...rest } = req.body

  const msg = {
    ...rest,
    userRef: db.collection('users').doc(userId),
    threadRef: threadId
      ? db.collection('threads').doc(threadId)
      : db.collection('threads').doc()
  }
  await db.collection('messages').add(msg)
  res
    .status(201)
    .send(JSON.stringify(msg))
    .end()
})

app.post('/teams', async (req, res) => {
  const { userId, ...rest } = req.body

  const team = {
    ...rest,
    userRef: db.collection('users').doc(userId)
  }

  // TODO do this as a transaction
  const teamRef = await db.collection('teams').add(team)

  await db
    .collection('users')
    .doc(userId)
    .collection('teams')
    .add({
      teamRef
    })

  res
    .status(201)
    .send(JSON.stringify(team))
    .end()
})

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app)
exports.createNotification = createNotification
exports.createUser = createUser
