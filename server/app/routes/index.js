'use strict';
var router = require('express').Router();

var request = require('request');

router.post('/offGrid', function(req, res, next) {
  var data = req.body;
  console.log(req.user);
  var message = "Hey, friend! I'm about to go OFF GRID. I'll be " + data.reason + ". I'm leaving at " + data.start + " and should be back in " + data.duration + ". Please check in on me if you don't hear from me!";
  var url = encodeURI('https://graph.facebook.com/' + req.user.facebook.id + "/feed?message=" + message + "&access_token=" + req.user.facebook.token);
  console.log(url);

  request.post(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.sendStatus(200);
    } else {
      res.sendStatus(response.statusCode);
    }
  })

});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
