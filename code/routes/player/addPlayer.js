/* New player route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

/* load the page */
router.get('/addPlayer',function(req, res, next) {
  res.render('player/addPlayer_form');
});

/* add a new player */
router.post('/addPlayer', function(req,res, next) {
  
  var context = {};
  context.p_fName = req.body['p_fName'];
  context.p_lName = req.body['p_lName'];

  /* debug - confirm input - CONFIRMED*/
  /*console.log(req.body)*/

  var insertQuery = "INSERT INTO Players(p_fName, p_lName) VALUES(?,?)";
  /* debug - confirm insertQuery */
  /*console.log(insertQuery)*/

  mysql.pool.query(insertQuery,[context.p_fName,context.p_lName],
    function(err, result){
      if(err){
        next(err);
        console.log(1)
        return;
      }
      console.log(2)
      res.redirect('searchPlayer');
    }
  ); 
});
 
module.exports = router;