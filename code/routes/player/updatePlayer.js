/* Update player route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// Load the Form
  router.post('/updatePlayer', function(req, res, next) {
  var context = {};
  context.p_fName = req.body.p_fName;
  context.p_lName = req.body.p_lName;
  context.playerID = req.body.playerID;

  /*console.log(req.body)*/ /* - CONFIRMED Pulling Correct Data into text field */
  console.log(1)
  res.render('player/updatePlayer_form', context);
});

/* script for the players page*/
router.post('/updatePlayer_update', function(req, res, next) {

  console.log(2)

  var context = {};
  context.playerID = req.body.playerID;
  context.p_fName = req.body.p_fName;
  context.p_lName = req.body.p_lName;

  /* debug - confirm if all values are accepted - CONFIRMED*/
  /*console.log(req.body)*/

  // FIND ALL VALUES FOR THE SELECTED ROW
  var findAllQuery = "SELECT * " +
  "FROM Players "
  "WHERE Players.playerID=?";

  mysql.pool.query(findAllQuery, [req.body.playerID], function(err, result) {
    if (err) {
      next(err);
      console.log(3)
      return;
    }
    console.log(4)

    // Update if User entered values
    if (result.length >= 1) {
      console.log(5)
      var currentValue = result[0];

      var updateAllQuery = "UPDATE Players " +
      "SET Players.p_fName=?, Players.p_lName=? " +
      "WHERE Players.playerID=?";

      mysql.pool.query(updateAllQuery, 
        [
          req.body['p_fName'] || currentValue.p_fName,
          req.body['p_lName'] || currentValue.p_lName,
          req.body.playerID
        ],
        function(err, result) {
          if (err) {
            console.log(6)
            console.log(req.body)

            next(err);
            return;
          }
          console.log(7)
          console.log(req.body)
          res.redirect('searchPlayer');
        });
    }
  });
});

module.exports = router;