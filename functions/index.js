// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// The Cloud Firestore
const db = admin.firestore();

const validator = require('validator');
const dayjs = require('dayjs')

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
  console.log('snapshot.empty:', snapshot.empty)
  return !snapshot.empty
}

// https://firebase.google.com/docs/reference/functions/providers_https_#functionserrorcode
const ERROR_CODE = {
  OK: 'ok',
  CANCELLED: 'cancelled',
  UNKNOWN: 'unknown',
  INVALID_ARGUMENT: 'invalid-argument',
  DEADLINE_EXCEEDED: 'deadline-exceeded',
  NOT_FOUND: 'not-found',
  ALREADY_EXISTS: 'already-exists',
  PERMISSION_DENIED: 'permission-denied',
  RESOURCE_EXHAUSTED: 'resource-exhausted',
  FAILED_PRECONDITION: 'failed-precondition',
  ABORTED: 'aborted',
  OUT_OF_RANGE: 'out-of-range',
  UNIMPLEMENTED: 'unimplemented',
  INTERNAL: 'internal',
  UNAVAILABLE: 'unavailable',
  DATA_LOSS: 'data-loss',
  UNAUTHENTICATED: 'unauthenticated',
}

const getHttpsError = (errorCode, detail) => {
  throw new functions.https.HttpsError(errorCode, detail)
}

const verifyUser = ({ name, email, group, team }) => {
  if(typeof name !== 'string') {
    return 'User name should be string'
  }
  if(!name) {
    return 'User name should not be undefined'
  }
  if(name.length <= 2) {
    return 'User name should be longer than 2 letters'
  }
  if(!validator.isEmail(email)) {
    return 'User email should be email format'
  }
  if(typeof group !== 'string' && group.length <= 2) {
    // TODO DB에 저장된 Group 정보로 대조할 것
    return 'User group should be included with groups'
  }
  if(typeof team !== 'string' && team.length <= 2) {
    // TODO DB에 저장된 team 정보로 대조할 것
    return 'User team should be included with teams'
  }
  return null
}

// https://firebase.google.com/docs/functions/callable
exports.echo = functions.https.onCall((data, context) => {
  return data
});

exports.addUsers = functions.https.onCall(async (data, context) => {
  if(!data.users && data.users.length === 0) {
    return getHttpsError(ERROR_CODE.INVALID_ARGUMENT, 'User list is not valid')
  }

  // https://firebase.google.com/docs/firestore/manage-data/transactions
  // TODO 여러개의 레코드셋을 동시에 추가하려면?
  const errors = [];
  data.users.forEach(async (user) => {
    const message = verifyUser(user)
    if(!message) {
      try {
        const { name, email, group, team } = user
        const result = await admin.firestore().collection('users').add({
          name,
          email,
          group,
          team,
        });
      } catch(error) {
        errors.push({
          user,
          error: error.message
        })
      }
    } else {
      errors.push({
        user,
        error: message
      })
    }
  })

  return {
    success: errors.length === 0,
    errors
  };
})

// https://firebase.google.com/docs/functions/http-events
exports.date = functions.https.onRequest((req, res) => {
  res.status(200).send(dayjs())
});
