/* script to find player based on their first and/or last name */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.get('/searchPlayer', function(req, res, next) {
  var context = {};

  mysql.pool.query("SELECT Players.playerID, Players.p_fName, Players.p_lName " +
    "FROM Players ORDER BY Players.p_fName ASC", function(err, result) {
      if(err){
      console.log(1)
      next(err);
      return;
      }
      context.cards = result;
      res.render('player/searchPlayer_form', context);
    });
});

router.post('/searchPlayer_search', function(req, res, next) {
  var context = {};

  context.p_fName = req.body.p_fName;
  context.p_lName = req.body.p_lName;

  // Variable to hold strings for queries
  var getSearchQuery = ""

  // Search by First Name
  if (context.p_fName && !context.p_lName) {

    getSearchQuery = "SELECT Players.playerID, Players.p_fName, Players.p_lName " +
    "FROM Players " +
    "WHERE Players.p_fName=? " +
    "ORDER BY Players.p_fName ASC";

    var insert = [req.body.p_fName]
    /* debug - confirm input (CONFIRMED) */
    console.log(req.body)

    mysql.pool.query(getSearchQuery, insert, function(err, results) {
      if (err) {
        console.log(2)
        next(err);
        return;
      }
      console.log(3)

    /* debug - confirm insert that the query is entered in the database (CONFIRMED) */
    /*console.log(insert)*/

    /* debug -conform that the var accepted the query - CONFIRMED */
    /*console.log(getSearchQuery)*/

      // Display Data
        // If one or more results
      if (results.length >= 1) {
        context.cards = results;
        context.p_fName = results[0]['p_fName'];
        context.p_lName = results[0]['p_lName'];
        res.render('player/player_found', context);
      }
      // No Results
      else {
        res.render('player/player_notFound', context);
      }
    });
  
  }
  // Search by Last Name
  else if (context.p_lName && !context.p_fName){
    getSearchQuery = "SELECT Players.p_fName, Players.p_lName " +
    "FROM Players " +
    "WHERE Players.p_lName=? " +
    "ORDER BY Players.p_fName ASC";

    var insert = [req.body.p_lName]
    /* debug - confirm input (CONFIRMED) */
    /*console.log(req.body)*/


    mysql.pool.query(getSearchQuery, insert, function(err, results) {
      if (err) {
        console.log(3)
        next(err);
        return;
      }
      console.log(4)

      /* debug - confirm insert that the query is entered in the database (CONFIRMED) */
    /*console.log(insert)*/

    /* debug -conform that the var accepted the query - CONFIRMED */
    /*console.log(getSearchQuery)*/

      // Display Data
        // If one or more results
      if (results.length >= 1) {
        context.cards = results;
        context.p_fName = results[0]['p_fName'];
        context.p_lName = results[0]['p_lName'];
        res.render('player/player_found', context);
      }
      // No Results
      else {
        res.render('player/player_notFound', context);
      }
    });
  }
  // Search by First and Last Name
  else {
    getSearchQuery = "SELECT Players.p_fName, Players.p_lName " +
    "FROM Players " + 
    "WHERE Players.p_fName=? AND Players.p_lName=? " +
    "ORDER BY Players.p_lName ASC";

    var insert = [req.body.p_fName, req.body.p_lName]
    /* debug - confirm input (CONFIRMED) */
    /*console.log(req.body)*/

    mysql.pool.query(getSearchQuery, insert, function(err, results) {

      if (err) {
        next(err);
        console.log(5)
        return;
      }
      console.log(6)

      /* debug - confirm insert that the query is entered in the database (CONFIRMED) */
    /*console.log(insert)*/

    /* debug -conform that the var accepted the query - CONFIRMED */
    /*console.log(getSearchQuery)*/

      // Display Data
        // If one or more results
      if (results.length >= 1) {
        context.cards = results;
        context.p_fName = results[0]['p_fName'];
        context.p_lName = results[0]['p_lName'];
        res.render('player/player_found', context);
      }
      // No Results
      else {
        res.render('player/player_notFound', context);
      }
    });
  }
  




}); 

module.exports = router;
