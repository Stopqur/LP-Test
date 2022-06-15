const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();


module.exports = {
  db,
  admin,
  functions,
};
