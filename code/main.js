/* Main app file for the project */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars').create({defaultLayout:'main'});

// Express app
var app = express();

// Public Directory
app.use(express.static(path.join(__dirname, '/public')));

// Bodyparser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// PORT
app.set('port', 8560);

/*ROUTES - to all pages*/
// Home
app.use(require('./routes/home'));

//Display
app.use(require('./routes/display/cards_and_players'));
app.use(require('./routes/display/cards_and_teams'));
app.use(require('./routes/display/cardsPlayersTeams'));
app.use(require('./routes/display/fullView'));
app.use(require('./routes/display/players_and_teams'));

// Card
app.use(require('./routes/card/searchCard'));
app.use(require('./routes/card/addCard'));
app.use(require('./routes/card/updateCard'));
app.use(require('./routes/card/deleteCard'));
app.use(require('./routes/card/changeCard'));

// Player
app.use(require('./routes/player/searchPlayer'));
app.use(require('./routes/player/addPlayer'));
app.use(require('./routes/player/updatePlayer'));
app.use(require('./routes/player/changePlayer'));
app.use(require('./routes/player/deletePlayer'));

// Type
app.use(require('./routes/type/searchType'));
app.use(require('./routes/type/addType'));
app.use(require('./routes/type/updateType'));
app.use(require('./routes/type/changeType'));
app.use(require('./routes/type/deleteType'));

// Team
app.use(require('./routes/team/searchTeam'));
app.use(require('./routes/team/addTeam'));
app.use(require('./routes/team/updateTeam'));
app.use(require('./routes/team/changeTeam'));
app.use(require('./routes/team/deleteTeam'));

// 404 - No Page Error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// 500 - Server Error
app.use(function(err, req, res, next){
  res.status(500);
  res.render('500');
});

// Console Output to confirm express is running
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
