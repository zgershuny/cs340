/* script for the display/cards_and_teams page */
 
var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.get('/cards_and_teams', function (req, res, next) {
  var context = {};

  mysql.pool.query("SELECT CONCAT(Teams.location,' ', Teams.teamName) AS 'TeamName', " +
    "CONCAT(Cards.cardYear, ' ', Cards.cardBrand) AS 'Card' " +
    "FROM Cards INNER JOIN Teams ON Cards.teamID=Teams.teamID " +
    " ORDER BY `TeamName` ASC", function (err, result) {
      /* Render 500 if error*/
      if (err) {
          next(err);
          return;
      }
      context.cards = result;
      res.render('display/cards_and_teams', context);
  });
});

module.exports = router;