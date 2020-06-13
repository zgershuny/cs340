/* script to delete type */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

router.post('/deleteType', function(req, res, next) {
  
  var context = {};
  context.typeID = req.body.typeID;


  /* find the type to delete */
  mysql.pool.query("SELECT typeID FROM Types WHERE typeID=?", [req.body.typeID], function(err, result) {

  /* Confirm that one typeID is pulled - CONFIRMED */
  /*console.log(req.body)*/
  
  if (err) {
    next(err);
    console.log(1)
    return;
  }

  console.log(2)
/*  console.log(req.body)*/

  /* delete type */
  deleteTypeQuery = "DELETE FROM Types WHERE Types.typeID=?";

  /*debug deleteCardQuery is right - CONFIRMED */
  /*console.log(deleteCardQuery)*/

  mysql.pool.query(deleteTypeQuery , [context.typeID], 
    function(err, result) {
      if (err) {

        /* Confirm that the right typeID is passed - CONFIRMED */
        /*console.log(req.body)*/

        next(err);
        console.log(3)
        return;
      }
      console.log(4)
      res.redirect('searchType');
    });
  });
});

module.exports = router;