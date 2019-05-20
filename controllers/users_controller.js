const models = require('../models/index'),
  router = require('express').Router(),
  Auth = require('../services/auth');

router.get('/validate', Auth.restrict, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    token: req.user.token,
    id: req.user.id
  })
})

router.post('/', (req, res) => {

  const email = req.body.email.toLowerCase();

  const {
    name,
    password,
    password_confirmation
  } = req.body;

  const errors = {
    name: [],
    email: [],
    password: [],
    password_confirmation: []
  };

  let error = false;
  Object.keys(errors).forEach(key => {

    if (!req.body[key].split(' ').join('')) {
      errors[key].push(`${key.split('_').join(' ')} is required`);
      error = true;
    }
  })

  if (password !== password_confirmation) {
    errors.password_confirmation.push("Password does not match confirmation.");
    error = true;
  }

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    errors.email.push("Not a valid email address.");
    error = true;
  }

  if (!error) {
    console.log('name', name)
    models.User
      .generateToken(models.User.newUser, name, email, password)
      .then(data => {
        res.json({
          id: data.id,
          name: data.name,
          email: data.email,
          token: data.token
        });
      })
      .catch(err => console.log(err))
  } else {
    res.status(400).json({
      errors: errors
    })
  }
});

module.exports = router;
