/* script to delete a card and it's corresponding type */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

/* script to delete card */
router.post('/deleteCard', function(req, res, next) {
  
  var context = {};
  context.cardID = req.body.cardID;
  context.typeID = req.body.typeID;

  /*if cardID is passed but no typeID associated*/
  if(context.cardID && !context.typeID)
  {
  	/*find the card*/
    mysql.pool.query("SELECT typeID FROM Cards WHERE typeID=?", [req.body.typeID], function(err, result) {

    /* Confirm that one typeID is pulled - CONFIRMED */
    /*console.log(req.body)*/
    
    if (err) {
      next(err);
      console.log(1)
      return;
    }

    console.log(2)

    /*delete*/
    deleteCardQuery = "DELETE FROM Cards WHERE Cards.cardID=?";

    /*debug deleteCardQuery is right - CONFIRMED */
    /*console.log(deleteCardQuery)*/

    mysql.pool.query(deleteCardQuery , [context.cardID], 
      function(err, result) {
        if (err) {

          /* Confirm that the right typeID is passed - CONFIRMED */
          /*console.log(req.body)*/

          next(err);
          console.log(3)
          return;
        }
        console.log(4)
        res.render('card/deleteCard_confirmed');
      });
    });
  }
  /*cardID and typeID is associated*/
  else
  {
  	/*find the card with the typeID*/
    mysql.pool.query("SELECT typeID FROM Cards WHERE typeID=?", [req.body.typeID], function(err, result) {

    /* Confirm that one typeID is pulled - CONFIRMED */
    /*console.log(req.body)*/
    
    if (err) {
      next(err);
      console.log(5)
      return;
    }
    console.log(6)

    /*delete the card and typeID*/
    deleteCardQuery = "DELETE FROM Cards, Types " +
      "USING Cards " +
      "INNER JOIN Types " +
      "WHERE Cards.cardID=? and Types.typeID=?";

    /*debug deleteCardQuery is right - CONFIRMED */
    /*console.log(deleteCardQuery)*/

    mysql.pool.query(deleteCardQuery, [context.cardID, context.typeID], 
      function(err, result) {
        if (err) {
          next(err);
          console.log(7)
          return;
        }
        console.log(8)
        res.render('card/deleteCard_confirmed');
      });
    });
  }
});

module.exports = router;