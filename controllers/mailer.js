const router = require('express').Router();
const models = require('../models/index');
const mailgun = require('mailgun-js');

router.post('/', (req, res) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_KEY,
    domain: process.env.DOMAIN
  });
  const emailData = {
    from: req.body.from,
    to: process.env.EMAIL,
    subject: req.body.subject,
    text: req.body.text
  }
  console.log(emailData);
  mg.messages().send(emailData, function(error, body) {
    if (error) {
      res.status(400).json(error);
    } else {
      res.json(body);
    }
  });
})

module.exports = router;
