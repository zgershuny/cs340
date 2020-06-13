/* script for the display/cards_and_players page */
 
var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

/* script to load page */
router.get('/fullView', function (req, res, next) {
  var context = {};

  mysql.pool.query("SELECT Players.playerID, CONCAT(Players.p_fName, ' ', Players.p_lName) AS 'p_name' " +
    "FROM Players ORDER BY `p_name` ASC", function(err, result) {
    if(err){
      console.log(1)
      next(err);
      return;
    }
    /*console.log(2)*/
    context.players = result;

    mysql.pool.query("SELECT Teams.teamID, CONCAT(Teams.location, ' ', Teams.teamName) AS 't_name' " +
      "FROM Teams ORDER BY `t_name` ASC", function(err, result) {
      if(err){
        console.log(3)
        next(err);
        return;
      }
      /*console.log(4)*/
      context.teams = result;

      mysql.pool.query("SELECT Cards.cardID, Cards.cardYear, Cards.cardBrand, " +
        "Players.playerID, Players.p_fName, Players.p_lName, " +
        "Teams.teamID, Teams.location, Teams.teamName, " +
        "Types.typeID, Types.grade, Types.description " +
        "FROM Cards LEFT JOIN Players ON Cards.playerID=Players.playerID " +
        "LEFT JOIN Teams ON Cards.teamID=Teams.teamID " +
        "LEFT JOIN Types ON Cards.typeID=Types.typeID " + 
        "ORDER BY Cards.cardYear ASC", function (err, result) {
          /* Render 500 if error*/
          if (err) {
              next(err);
              console.log(5)
              return;
          }
          /*console.log(6)*/
          context.cards = result;
          res.render('display/fullView', context);
        });
      });
    });
});

/* script to catalogue */
router.post('/fullView', function(req, res, next){
  var context ={}
  context.cardYear = req.body['cardYear'];
  context.cardBrand = req.body['cardBrand'];
  context.playerID = req.body.playerID;
  context.teamID = req.body.teamID;
  context.grade = req.body['grade'];
  context.description = req.body['description'];

  /* debug - confirm input */
/*  console.log(req.body)*/

  /* INSERT Type */
  var insertTypeQuery = "INSERT INTO Types(grade, description) VALUES(?,?)";

  mysql.pool.query(insertTypeQuery,[context.grade,context.description],
    function(err, result){
      if(err){
        next(err);
        console.log(7)
        return;
      }
      console.log(8)

      /* FIND new TypeID */
      var findTypeID = "SELECT LAST_INSERT_ID()";

      mysql.pool.query(findTypeID, function(err, foundTypeID){
        if(err){
        next(err);
        console.log(9)
        return;
      }
      
      /* INSERT Card with corresponding FKs */
      var insertCardQuery = "INSERT INTO Cards(cardYear, cardBrand, playerID, teamID, typeID) VALUES(?,?,?,?, LAST_INSERT_ID())";

      mysql.pool.query(insertCardQuery,[context.cardYear,context.cardBrand, context.playerID, context.teamID],
      function(err, result){
        if(err){
          next(err);
          console.log(10)
          return;
        }
        console.log(11)
        res.redirect('/fullview');

      });// close INSERT Card, Player, Team 
      
    }); // close Find typeID
  }); // Close INSERT Type


});

module.exports = router;