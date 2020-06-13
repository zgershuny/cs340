/* New type route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');
 
/* load form */
router.get('/addType',function(req, res, next) {
  res.render('type/addType_form');
});

/* add a new type*/
router.post('/addType', function(req,res, next) {
  
  var context = {};
  context.grade = req.body['grade'];
  context.description = req.body['description'];

  /* debug - confirm input - CONFIRMED*/
  /*console.log(req.body)*/

  var insertQuery = "INSERT INTO Types(grade, description) VALUES(?,?)";
  /* debug - confirm insertQuery */
  /*console.log(insertQuery)*/

  mysql.pool.query(insertQuery,[context.grade,context.description],
    function(err, result){
      if(err){
        next(err);
        console.log(1)
        return;
      }
      console.log(2)
      res.redirect('searchType');
    }); 
});
 
module.exports = router;