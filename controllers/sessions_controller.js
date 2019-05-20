const models = require('../models/index'),
      router = require('express').Router(),
      bcrypt = require('bcryptjs')

router.post('/', (req, res)=>{
  models.User
    .findByEmail(req.body.email.toLowerCase())
    .then(data => {
      if(data){
        if(bcrypt.compareSync(req.body.password, data.password_digest)){
          return models.User.generateToken(models.User.updateToken, data.id);
        } else {
          res.status(401).json({ errors: {password: 'Incorrect Password'} });
        }
      } else {
        res.status(401).json({ errors: {email: 'Incorrect Email'} });
      }
    })
    .then(user => {
      res.json({
        id: user[1][0].id,
        name: user[1][0].name,
        email: user[1][0].email,
        token: user[1][0].token
      });
    });
});


module.exports = router;
