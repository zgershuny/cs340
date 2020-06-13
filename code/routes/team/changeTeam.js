/* Change team route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// Load the Form

router.post('/changeTeam', function(req, res, next) {
  var context = {};
  context.cardID = req.body.cardID;
  context.cardYear = req.body.cardYear;
  context.cardBrand = req.body.cardBrand;
  
  mysql.pool.query("SELECT Teams.teamID, CONCAT(Teams.location, ' ', Teams.teamName) AS 't_name' " +
    "FROM Teams ORDER BY `t_name` ASC", function(err, result) {
    if(err){
      console.log(1)
      next(err);
      return;
    }
    context.teams = result;
    res.render('team/changeTeam_form', context);
  });
});

/* script to change team */
router.post('/changeTeam_change', function(req, res, next) {

  console.log(2)

  var context = {};
  context.teamID = req.body.teamID;
  context.cardID = req.body.cardID;

  /* debug - confirm if all values are accepted*/
  console.log(req.body)

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
      var currentValue = result[0];

      var updateAllQuery = "UPDATE Cards " +
      "SET Cards.teamID=? " +
      "WHERE Cards.cardID=?";

      mysql.pool.query(updateAllQuery, 
        [
          req.body.teamID, req.body.cardID
        ],
        function(err, result) {
          if (err) {
            console.log(6)
            /*console.log(req.body)*/

            next(err);
            return;
          }
          console.log(7)
          console.log(req.body)
          res.redirect('fullView');
        });
    }
  });
});

module.exports = router;