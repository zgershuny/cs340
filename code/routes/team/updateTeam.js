/* Update Team route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// Load the Form
router.post('/updateTeam', function(req, res, next) {
  var context = {};
  context.location = req.body.location;
  context.teamName = req.body.teamName;
  context.teamID = req.body.teamID;

  /*console.log(req.body)*/ /* - CONFIRMED Pulling Correct Data into text field */
  console.log(1)
  res.render('team/updateTeam_form', context);
});

/* script for the page's actions*/
router.post('/updateTeam_update', function(req, res, next) {

  console.log(2)

  var context = {};
  context.teamID = req.body.teamID;
  context.teamName = req.body.teamName;
  context.location = req.body.location;

  /* debug - confirm if all values are accepted - CONFIRMED*/
  /*console.log(req.body)*/

  // FIND ALL VALUES FOR THE SELECTED ROW
  var findAllQuery = "SELECT * " +
  "FROM Teams "
  "WHERE Teams.teamID=?";

  mysql.pool.query(findAllQuery, [req.body.teamID], function(err, result) {
    if (err) {
      next(err);
      console.log(3)
      return;
    }
    console.log(4)

    // Update if User entered values
    if (result.length >= 1) {
      console.log(5)
/*      var currentValue = result[0];*/

      var updateAllQuery = "UPDATE Teams " +
      "SET Teams.location=?, Teams.teamName=? " +
      "WHERE Teams.teamID=?";

      mysql.pool.query(updateAllQuery, 
        [
          req.body['location'] || currentValue.location,
          req.body['teamName'] || currentValue.teamName,
          req.body.teamID
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
          res.redirect('searchTeam');
        });
    }
  });
});

module.exports = router;