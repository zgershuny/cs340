/* script to delete a card and it's corresponding type */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.post('/deleteTeam', function(req, res, next) {
  
  var context = {};
  context.teamID = req.body.teamID;

  mysql.pool.query("DELETE FROM Teams WHERE Teams.teamID=?", [req.body.teamID], function(err, result) {

  /* Confirm that one teamID is pulled - CONFIRMED */
  console.log(req.body)
  
  if (err) {
    next(err);
    console.log(req.body)
    console.log(1)
    return;
  }
  console.log(2)
  res.redirect('searchTeam');
  });
});

module.exports = router;