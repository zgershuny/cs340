/* script for the display/players_and_teams page */
 
var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.get('/players_and_teams', function (req, res, next) {
  var context = {};
  console.log(1)
  mysql.pool.query("SELECT CONCAT(Players.p_fName, ' ', Players.p_lName) AS 'FullName', " + 
                    "CONCAT(Teams.location,' ', Teams.teamName) AS 'TeamName' " +
                    "FROM Cards " +
                    "INNER JOIN Teams ON Cards.teamID=Teams.teamID " +
                    "INNER JOIN Players ON Cards.playerID=Players.playerID " +
                    "ORDER BY `FullName` ASC", function (err, result) {
      /* Render 500 if error*/
      if (err) {
          console.log(2)
          next(err);
          return;
      }
      context.cards = result;
      console.log(3)
      res.render('display/players_and_teams', context);
  });
});

module.exports = router;