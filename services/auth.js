const bcrypt = require('bcryptjs'),
      models = require('../models/index');

const Auth = {
  authenticate: (req, res, next) => {
    const token = req.query.auth_token;
    if(token){
      models.User
        .findByToken(token)
        .then(data => {
          req.user = data;
          next();
        })
        .catch(err => {
          req.user = false;
          next()
        })
    } else {
      req.user = false;
      next();
    }
  },

  restrict: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({error: 'user not authorized'});
    }
  },
}

module.exports = Auth;
