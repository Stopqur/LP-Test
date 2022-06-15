const users = require('../models/users.js');
const {
  functions,
} = require('../middleware/firebase');

const runtimeOpts = {
  timeoutSeconds: 540,
  memory: '4GB',
};

exports.createUser = functions
    .runWith(runtimeOpts)
    .https
    .onRequest(async (req, res) => {
      try {
        const result = await users.createUser(req.body, req.query);
        if (result.response === 'error') {
          functions.logger.log(result, 'createUser result');
          return res.status(400).send(result);
        }
        return res.status(200).send(result);
      } catch (err) {
        functions.logger.warn(err, 'createUser err catch');
        return res.
            status(500).send({response: 'error', message: err.message});
      }
    });

exports.getUserById = functions
    .runWith(runtimeOpts)
    .https
    .onRequest(async (req, res) => {
      try {
        if (!req?.query?.userId) {
          return res.status(400).send({
            response: 'error',
            message: 'userId must be filled in query',
          });
        }
        const result = await users.getUserById(req.query.userId);
        if (result.response === 'error') {
          functions.logger.log(result, 'createUser result');
          return res.status(400).send(result);
        }
        return res.status(200).send(result);
      } catch (err) {
        functions.logger.warn(err, 'createUser err catch');
        return res.
            status(500).send({response: 'error', message: err.message});
      }
    });
