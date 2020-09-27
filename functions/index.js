// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// The Cloud Firestore
const db = admin.firestore();

const validator = require('validator');

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Uppercasing', context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Cloud Firestore.
      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });

const hasEmail = async (email) => {
  const snapshot = await db.collection('users').where('email', '==', email).get();
  return !snapshot.empty
}

const throwError = (message, detail) => {
  throw new functions.https.HttpsError(message, detail)
}

const isValidUser = ({ name, email, group, team }) => {
  if(typeof name !== 'string' && name.length <= 2) {
    throwError('invalid-argument', 'User name is not valid')
  }
  if(!validator.isEmail(email)) {
    throwError('invalid-argument', 'User email is not valid')
  }
  if(!hasEmail(email)) {
    throwError('duplicated-key', 'User email is already taken')
  }
  if(typeof group !== 'string' && group.length <= 2) {
    // TODO DB에 저장된 Group 정보로 대조할 것
    throwError('invalid-argument', 'User group is not valid')
  }
  if(typeof team !== 'string' && team.length <= 2) {
    // TODO DB에 저장된 team 정보로 대조할 것
    throwError('invalid-argument', 'User team is not valid')
  }
}

exports.hasEmail = functions.https.onRequest(async (req, res) => {
  if(validator.isEmail(req.body.email)) {
    res.json({ error: 'Email is not valid' });
    return;
  }

  // if(hasEmail(email)) {

  // }
})

exports.addUsers = functions.https.onRequest(async (req, res) => {
  if(!req.body.users && req.body.users.length === 0) {
    res.json({ error: 'User list is not valid' });
    return;
  }

  const added = []
  const errors = []
  req.body.users.forEach(async (user) => {
    try {
      isValidUser(user)
      const result = await admin.firestore().collection('users').add({
        name: user.name,
        email: user.email,
        group: user.group,
        team: user.team,
      });
      added.push(result)
    } catch(error) {
      console.log('error:',error)
      errors.push(error)
    }
  })

  // const writeResult = await admin.firestore().collection('users').add({original: original});

  res.json({ result: {
    added,
    errors
  } });
})
