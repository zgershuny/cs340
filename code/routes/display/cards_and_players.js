/* script for the display/cards_and_players page */
 
var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.get('/cards_and_players', function (req, res, next) {
  var context = {};

  mysql.pool.query("SELECT CONCAT(Players.p_fName,' ', Players.p_lName) AS 'FullName', " +
    "CONCAT(Cards.cardYear, ' ', Cards.cardBrand) AS 'Card' " +
    "FROM Cards " +
    "LEFT JOIN Players ON Cards.playerID=Players.playerID " +
    " ORDER BY `FullName` ASC", function (err, result) {
      /* Render 500 if error*/
      if (err) {
          next(err);
          return;
      }
      context.cards = result;
      res.render('display/cards_and_players', context);
  });
});

module.exports = router;