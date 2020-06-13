/* New card route */

var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');
 

router.get('/addCard',function(req, res, next) {
  res.render('card/addCard_form');
});

/*script to add card */
router.post('/addCard', function(req,res, next) {
  
  /*get values*/
  var context = {};
  context.cardYear = req.body['cardYear'];
  context.cardBrand = req.body['cardBrand'];

  /* debug - confirm input - CONFIRMED */
  /*console.log(req.body)*/

  /* insert */
  var insertQuery = "INSERT INTO Cards(cardYear, cardBrand) VALUES(?,?)";
  /* debug - confirm insertQuery - CONFIRMED */
  /*console.log(insertQuery)*/

  mysql.pool.query(insertQuery,[context.cardYear,context.cardBrand],
    function(err, result){
      if(err){
        next(err);
        console.log(1)
        return;
      }
      console.log(2)
      res.redirect('searchCard');
    }); 
});
 
module.exports = router;