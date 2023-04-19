const db = require('../models');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 's0/\/\P4$$w0rD';
const User = db.users;

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      let user = jwt.verify(token, SECRET_KEY);
      let userDb = await User.findOne({ where: { id: user.id } });
      if (Object.keys(userDb).length > 0) {
        req.userId = user.id;
        next();
      } else {
        res.status(200).json({
          statuscode: 403,
          message: 'Unautorized User!',
          data: userDb,
        });
      }
    } else {
      res.status(200).json({
        statuscode: 403,
        message: 'Unautorized User!',
        data: userDb,
      });
    }
  } catch (e) {
    console.log('error', e);
    res.status(200).json({ statuscode: 403, message: 'Unautorized User!' });
  }
};

module.exports = auth;
