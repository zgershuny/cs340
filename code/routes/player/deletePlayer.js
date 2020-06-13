/* script to delete a card and it's corresponding type */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.post('/deletePlayer', function(req, res, next) {
  
  var context = {};
  context.playerID = req.body.playerID;


  mysql.pool.query("DELETE FROM Players WHERE Players.playerID=?", [req.body.playerID], function(err, result) {

    /* Confirm that one playerID is pulled - CONFIRMED */
  console.log(req.body)
  
  if (err) {
    next(err);
    console.log(req.body)
    console.log(1)
    return;
  }
  console.log(2)
  res.redirect('searchPlayer');
  });
});

module.exports = router;