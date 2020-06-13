/* Update player route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// Load the Form
router.post('/changePlayer', function(req, res, next) {
  var context = {};
  context.cardID = req.body.cardID;
  context.cardYear = req.body.cardYear;
  context.cardBrand = req.body.cardBrand;
  
  mysql.pool.query("SELECT Players.playerID, CONCAT(Players.p_fName, ' ', Players.p_lName) AS 'p_name' " +
    "FROM Players ORDER BY `p_name` ASC", function(err, result) {
    if(err){
      console.log(1)
      next(err);
      return;
    }
    context.players = result;
    res.render('player/changePlayer_form', context);
  });
});

/* script to change player */
router.post('/changePlayer_change', function(req, res, next) {

  console.log(2)

  var context = {};
  context.playerID = req.body.playerID;
  context.cardID = req.body.cardID;

  /* debug - confirm if all values are accepted*/
  console.log(req.body)

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

      var updateAllQuery = "UPDATE Cards " +
      "SET Cards.playerID=? " +
      "WHERE Cards.cardID=?";

      mysql.pool.query(updateAllQuery, [req.body.playerID, req.body.cardID],
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