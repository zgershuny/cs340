/* script for the display/cards_and_players page */
 
var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.get('/cardsPlayersTeams', function (req, res, next) {
  var context = {};

  mysql.pool.query("SELECT CONCAT(Cards.cardYear, ' ', Cards.cardBrand) AS 'Card', " +
    "CONCAT(Players.p_fName,' ', Players.p_lName) AS 'FullName', " +
    "CONCAT(Teams.location,' ', Teams.teamName) AS 'TeamName' " +
    "FROM Cards LEFT JOIN Players " +
    "ON Cards.playerID=Players.playerID " +
    "LEFT JOIN Teams ON Cards.teamID=Teams.teamID " +
    "ORDER BY `Card` ASC", function (err, result) {
      /* Render 500 if error*/
      if (err) {
          next(err);
          return;
      }
      context.cards = result;
      res.render('display/cardsPlayersTeams', context);
  });
});

module.exports = router;