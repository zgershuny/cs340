/* script to find card based on their year and/or brand name */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

/*load the page*/
router.get('/searchCard', function(req, res, next) {
  var context = {};
  mysql.pool.query("SELECT Cards.cardID, Cards.cardYear, Cards.cardBrand " +
    "FROM Cards ORDER BY Cards.cardYear ASC", function(err, result){
      if(err){
      console.log(1)
      next(err);
      return;
      }
      context.cards = result;
      res.render('card/searchCard_form', context);
    })
});

/*page's actions */
router.post('/searchCard_search', function(req, res, next) {
  var context = {};

  context.cardYear = req.body.cardYear;
  context.cardBrand = req.body.cardBrand;

  // Variable to hold strings for queries
  var getSearchQuery = ""

  // Search by Year
  if (context.cardYear && !context.cardBrand) {

    getSearchQuery = "SELECT Cards.cardYear, Cards.cardBrand " +
    "FROM Cards " + 
    "WHERE Cards.cardYear=? " +
    "ORDER BY Cards.cardBrand ASC";

    var insert = [req.body.cardYear]
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
        context.cardYear = results[0]['cardYear'];
        context.cardBrand = results[0]['cardBrand'];
        res.render('card/card_found', context);
      }
      // No Results
      else {
        res.render('card/card_notFound', context);
      }
    });
  
  }
  // Search by Brand
  else if (context.cardBrand && !context.cardYear){
    getSearchQuery = "SELECT Cards.cardYear, Cards.cardBrand " +
    "FROM Cards " + 
    "WHERE Cards.cardBrand=? " +
    "ORDER BY Cards.cardYear ASC";

    var insert = [req.body.cardBrand]
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
        context.cardYear = results[0]['cardYear'];
        context.cardBrand = results[0]['cardBrand'];
        res.render('card/card_found', context);
      }
      // No Results
      else {
        res.render('card/card_notFound', context);
      }
    });
  }

  // Search by Year and Brand
  else {
    getSearchQuery = "SELECT Cards.cardYear, Cards.cardBrand " +
    "FROM Cards " + 
    "WHERE Cards.cardYear=? AND Cards.cardBrand=? " +
    "ORDER BY Cards.cardYear ASC";

    var insert = [req.body.cardYear, req.body.cardBrand]
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
        context.cardYear = results[0]['cardYear'];
        context.cardBrand = results[0]['cardBrand'];
        res.render('card/card_found', context);
      }
      // No Results
      else {
        res.render('card/card_notFound', context);
      }
    });
  }
}); 

module.exports = router;
