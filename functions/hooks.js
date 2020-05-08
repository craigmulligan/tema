const { db } = require('./db')
const functions = require('firebase-functions')

exports.createNotification = functions.firestore
  .document('messages/{messageId}')
  .onCreate((snap, context) => {
    const { mentions, ...msg } = snap.data()

    if (mentions.length > 0) {
      return Promise.all(
        mentions.map(m => {
          console.log(m)
          return db
            .collection('users')
            .doc(m)
            .collection('notifications')
            .add({
              text: `New message from ${msg.userRef.id}`,
              messageRef: snap.ref,
              createdAt: Date.now()
            })
        })
      )
    }
    return false
  })

exports.createUser = functions.auth.user().onCreate(user => {
  return db.collection('users').add(user)
})
