'use strict';
const bcrypt =  require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.generateToken = (callback, ...params) => {
    const token = bcrypt.hashSync(Math.random().toString(), 10);

    return User.findOne({
      where: {
        token: token
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
    return User.update({
      token: token
    }, {
      where: {
        id: id
      },
      returning: true
    })
  };

  User.newUser = (name, email, password, token) => {
    const password_digest = bcrypt.hashSync(password, 10);
    return User.create({
      name: name,
      email: email,
      password_digest: password_digest,
      token: token
    })
  };

  User.findByEmail = (email) => User.findOne({
    where: {
      email: email
    }
  });

  User.findByToken = (token) => User.findOne({
    where: {
      token: token
    }
  });

  return User;
};
