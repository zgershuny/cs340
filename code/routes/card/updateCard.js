/* Update card route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// Load the Page
router.post('/updateCard', function(req, res, next) {
  var context = {};
  context.cardYear = req.body.cardYear;
  context.cardBrand = req.body.cardBrand;
  context.cardID = req.body.cardID;

  console.log(1)
  res.render('card/updateCard_form', context);
});

/* actions for the page*/
router.post('/updateCard_update', function(req, res, next) {

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
          /* reload the page*/
          res.redirect('searchCard');
        });
    }
  });
});

module.exports = router;