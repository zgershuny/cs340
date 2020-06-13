/* script to find type based on grade */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

/* load the page */
router.get('/searchType', function(req, res, next) {
  var context = {};
  selectTypes = "SELECT DISTINCT Types.grade " +
  "FROM Types " +
  "ORDER BY `grade` ASC";

  mysql.pool.query(selectTypes, function(err, list) {
    if(err){
      console.log(1)
      next(err);
      return;
    }
    context.types = list;

    mysql.pool.query("SELECT Types.typeID, Types.grade, Types.description " +
      "FROM Types ORDER BY `grade` ASC", function(req, result) {
      if(err){
        console.log(2)
        next(err);
        return;
      }
      context.cards = result;
      res.render('type/searchType_form', context);
    });
  });
});

/* script for the page's actions */
router.post('/searchType_search', function(req, res, next) {
  var context = {};
  context.grade = req.body.grade;
  context.description = req.body.description;

  // Variable to find all the types associated to the grade input
  var getSearchQuery = "SELECT Types.typeID, Types.grade, Types.description " +
  "FROM Types " +
  "WHERE Types.grade=? " +
  "ORDER BY Types.grade ASC";

  /* debug - confirm input (CONFIRMED) */
  /*console.log(req.body)*/

  mysql.pool.query(getSearchQuery, [req.body.grade], function(err, results) {
    if (err) {
      console.log(3)
      next(err);
      return;
    }
    console.log(4)
    console.log(req.body)
  /* debug -conform that the var accepted the query - CONFIRMED */
  console.log(getSearchQuery)

    // Display Data
      // If one or more results
    if (results.length >= 1) {
      context.cards = results;
      context.grade = results[0]['grade'];
      context.description = results[0]['description'];
      res.render('type/type_found', context);
    }
  });
});

module.exports = router;
