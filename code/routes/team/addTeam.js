/* script to add a new team */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');
 

router.get('/addTeam',function(req, res, next) {
  res.render('team/addTeam_form');
});

router.post('/addTeam', function(req,res, next) {
  
  var context = {};
  context.location = req.body['location'];
  context.teamName = req.body['teamName'];

  /* debug - confirm input */
  console.log(req.body)

  var insertQuery = "INSERT INTO Teams(location, teamName) VALUES(?,?)";
  /* debug - confirm insertQuery */
  console.log(insertQuery)

  mysql.pool.query(insertQuery,[context.location,context.teamName],
    function(err, result){
      if(err){
        next(err);
        console.log(1)
        return;
      }
      console.log(2)
      res.redirect('searchTeam');
    }
  ); 
});
 
module.exports = router;
