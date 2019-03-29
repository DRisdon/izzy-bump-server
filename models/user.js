const bcrypt = require('bcryptjs'),
      Sequelize = require('sequelize'),
      sequelize = require('../db/config')


class User extends Sequelize.Model {}

User.init({
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password_digest: Sequelize.STRING,
  token: Sequelize.STRING
}, {
  sequelize
});

User.generateToken = (callback, ...params) => {
  const token = bcrypt.hashSync(Math.random().toString(), 10);

  return this.findOne({
    where: {
      title: 'aProject'
    },
    attributes: ['id']
  }).then((res) => {
    if (res) {
      return generateToken();
    }
    return callback(...params, token);
  })
};

User.updateToken = (id, token) => {
  return this.update({
    token: token
  }, {
    where: {
      id: id
    }
  })
};

User.newUser = (name, email, password, token) => {
  const password_digest = bcrypt.hashSync(password, 10);
  return this.create({
    name: name,
    email: email,
    password_digest: password_digest,
    token: token
  })
};
User.findByEmail = (email) => this.findOne({
  where: {
    email: email
  }
});

User.findByToken = (token) => this.findOne({
  where: {
    token: token
  }
});

module.exports = User;
