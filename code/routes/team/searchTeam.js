/* script to find team based on their location and/or name */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

/* load the page */
router.get('/searchTeam', function(req, res, next) {
  var context = {};
  mysql.pool.query("SELECT Teams.teamID, Teams.location, Teams.teamName " +
    "FROM Teams " +
    "ORDER BY Teams.location ASC", function(err, result){
      if(err){
      console.log(1)
      next(err);
      return;
      }
      context.cards = result;
      res.render('team/searchTeam_form', context);
    })
});

/* script for the page's actions */
router.post('/searchTeam_search', function(req, res, next) {
  var context = {};

  context.location = req.body.location;
  context.teamName = req.body.teamName;

  // Variable to hold strings for queries
  var getSearchQuery = ""

  // Search by Location
  if (context.location && !context.teamName) {

    getSearchQuery = "SELECT Teams.teamID, Teams.location, Teams.teamName " +
    "FROM Teams " +
    "WHERE Teams.location=? " +
    "ORDER BY Teams.location ASC";

    /* debug -conform that the var accepted the query - CONFIRMED */
    /*console.log(getSearchQuery)*/

    var insert = [req.body.location]

    /* debug - confirm input (CONFIRMED) */
    /*console.log(req.body)*/

    mysql.pool.query(getSearchQuery, insert, function(err, results) {
      if (err) {
        console.log(1)
        next(err);
        return;
      }

    /* debug - confirm insert that the query is entered in the database */
    /*console.log(insert)*/

    console.log(2)

      // Display Data
        // If one or more results
      if (results.length >= 1) {
        context.cards = results;
        context.location = results[0]['location'];
        context.teamName = results[0]['teamName'];  
        res.render('team/team_found', context);
      }
      // No Results
      else {
        res.render('team/team_notFound', context);
      }
    });
  
  }
  // Search by Name
  else if (context.teamName && !context.location){
    getSearchQuery = "SELECT Teams.teamID, Teams.location, Teams.teamName " +
    "FROM Teams " +
    "WHERE Teams.teamName=? " +
    "ORDER BY Teams.location ASC";

    var insert = [req.body.teamName]
    /* debug - confirm input (CONFIRMED) */
    /*console.log(req.body)*/

    mysql.pool.query(getSearchQuery, insert, function(err, results) {
      if (err) {
        console.log(1)
        next(err);
        return;
      }
      console.log(2)

    /* debug - confirm insert that the query is entered in the database (CONFIRMED) */
    /*console.log(insert)*/

    /* debug -conform that the var accepted the query - CONFIRMED */
    /*console.log(getSearchQuery)*/

      // Display Data
        // If one or more results
      if (results.length >= 1) {
        context.cards = results;
        context.location = results[0]['location'];
        context.teamName = results[0]['teamName'];  
        res.render('team/team_found', context);
      }
      // No Results
      else {
        res.render('team/team_notFound', context);
      }
    });
  }

  // Search by Location and Team Name
  else {
    getSearchQuery = "SELECT Teams.teamID, Teams.location, Teams.teamName " +
    "FROM Teams " +
    "WHERE Teams.location=? AND Teams.teamName=? " +
    "ORDER BY Teams.location ASC";

    var insert = [req.body.location, req.body.teamName]
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
        context.location = results[0]['location'];
        context.teamName = results[0]['teamName'];  
        res.render('team/team_found', context);
      }
      // No Results
      else {
        res.render('team/team_notFound', context);
      }
    });
  }
  




}); 

module.exports = router;
