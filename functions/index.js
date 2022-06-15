const admin = require('firebase-admin');
const serviceAccount = require(
    './test-audience-78739-firebase-adminsdk-pwsi8-410ba1ec51.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const users = require('./controllers/users');

exports.createUser = users.createUser;
exports.getUserById = users.getUserById;
