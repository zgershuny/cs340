/* Update card route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// Load the Form
router.post('/changeCard', function(req, res, next) {

	/* pass on the values to the form*/
  var context = {};
  context.cardID = req.body.cardID;
  context.cardYear = req.body.cardYear;
  context.cardBrand = req.body.cardBrand;

  console.log(1)
  res.render('card/changeCard_form', context);
});

router.post('/changeCard_change', function(req, res, next) {

  console.log(2)

  var context = {};
  context.cardID = req.body.cardID;
  context.cardYear = req.body.cardYear;
  context.cardBrand = req.body.cardBrand;

  /* debug - confirm if all values are accepted - CONFIRMED*/
  /*console.log(req.body)*/

  // FIND ALL VALUES FOR THE SELECTED ROW
  var findAllQuery = "SELECT * " +
  "FROM Cards "
  "WHERE Cards.cardID=?";

  mysql.pool.query(findAllQuery, [req.body.cardID], function(err, result) {
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
      "SET Cards.cardYear=?, Cards.cardBrand=? " +
      "WHERE Cards.cardID=?";

      mysql.pool.query(updateAllQuery, 
        [
          req.body['cardYear'] || currentValue.cardYear,
          req.body['cardBrand'] || currentValue.cardBrand,
          req.body.cardID
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
          res.redirect('fullView');
        });
    }
  });
});

module.exports = router;