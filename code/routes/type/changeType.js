/* Update Type route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// Load the Form
router.post('/changeType', function(req, res, next) {
  var context = {};
  context.typeID = req.body.typeID;
  context.grade = req.body.grade;
  context.description = req.body.description;

  /*console.log(req.body)*/ /* - CONFIRMED Pulling Correct Data into text field */
  console.log(1)
  res.render('type/changeType_form', context);
});

/* script for the page's actions */
router.post('/changeType_change', function(req, res, next) {

  console.log(2)

  var context = {};
  context.typeID = req.body.typeID;
  context.grade = req.body.grade;
  context.description = req.body.description;

  /* debug - confirm if all values are accepted - CONFIRMED*/
  /*console.log(req.body)*/

  /* grade and description are entered */
  if(context.grade && context.description)
  {
  	// FIND ALL VALUES FOR THE SELECTED ROW
	  var findAllQuery = "SELECT * " +
	  "FROM Types "
	  "WHERE Type.typeID=?";

	  mysql.pool.query(findAllQuery, [req.body.typeID], function(err, result) {
	    if (err) {
	      next(err);
	      console.log(3)
	      return;
	    }
	    console.log(4)

	    // Update if User entered values
	    if (result.length >= 1) {
	      console.log(5)
	      var currentValue = result[0];

	      var updateAllQuery = "UPDATE Types " +
	      "SET Types.grade=?, Types.description=? " +
	      "WHERE Types.typeID=?";

	      mysql.pool.query(updateAllQuery, 
	        [
	          req.body['grade'] || currentValue.grade,
	          req.body['description'] || currentValue.description,
	          req.body.typeID
	        ],

	        function(err, result) {
	          if (err) {
	            console.log(6)
	            console.log(req.body)

	            next(err);
	            return;
	          }
	          console.log(7)
	          console.log(req.body)
	          res.redirect('fullView');
	        });
	    }
	  });
  }
  /* grade is entered but not description */
  else if (context.grade && !context.description)
  {
  	// FIND ALL VALUES FOR THE SELECTED ROW
	  var findAllQuery = "SELECT * " +
	  "FROM Types "
	  "WHERE Type.typeID=?";

	  mysql.pool.query(findAllQuery, [req.body.typeID], function(err, result) {
	    if (err) {
	      next(err);
	      console.log(3)
	      return;
	    }
	    console.log(4)

	    // Update if User entered values
	    if (result.length >= 1) {
	      console.log(5)
	      var currentValue = result[0];

	      var updateAllQuery = "UPDATE Types " +
	      "SET Types.grade=?, Types.description=NULL " +
	      "WHERE Types.typeID=?";

	      mysql.pool.query(updateAllQuery, 
	        [
	          req.body['grade'] || currentValue.grade,
	          req.body.typeID
	        ],

	        function(err, result) {
	          if (err) {
	            console.log(6)
	            console.log(req.body)

	            next(err);
	            return;
	          }
	          console.log(7)
	          console.log(req.body)
	          res.redirect('fullView');
	        });
	    }
	  });
  }
 
});

module.exports = router;