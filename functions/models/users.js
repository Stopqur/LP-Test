const {v4: uuidv4} = require('uuid');
const {db} = require('../middleware/firebase.js');

const createUser = async (body, query) => {
  try {
    if (query.userId) {
      const refUser = db.collection('users').doc(query.userId);
      const snapUser = await refUser.get();
      if (snapUser.exists) {
        const dataUser = snapUser.data();
        for (const key in body) {
          if (dataUser[key] && typeof dataUser[key] === 'number') {
            if (isNaN(+body[key])) {
              return {
                response: 'error',
                message: `${key} should be a number`,
              };
            }
            dataUser[key] += body[key];
          } else {
            dataUser[key] = body[key];
          }
        }
        await refUser.set(dataUser);
        return {
          response: 'ok',
          data: dataUser,
        };
      } else {
        return {
          response: 'error',
          message: 'user was not found',
        };
      }
    }
    const userId = uuidv4();
    const newUser = {
      ...body,
      userId,
    };
    await db.collection('users').doc(userId).set(newUser);
    return {
      response: 'ok',
      data: newUser,
    };
  } catch (error) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};

const getUserById = async (userId) => {
  try {
    const snapToUser = await db.collection('users').doc(userId).get();
    if (snapToUser.exists) {
      return {
        response: 'ok',
        data: snapToUser.data(),
      };
    }
    return {
      response: 'error',
      message: 'User was not found',
    };
  } catch (error) {
    return {
      response: 'error',
      message: error.message,
    };
  }
};

module.exports.createUser = createUser;
module.exports.getUserById = getUserById;
