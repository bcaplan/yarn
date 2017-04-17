var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var methodOverride = require('method-override');

//environment variables
var port = process.env.PORT || 3000;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yarn';

//require the models because of the mcAccount page??
// var User = require('models/users.js');
// var Story = require('models/stories.js');

//middleware+++++++++++++++++++++++++++++++++++++
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: "peanutbutterjellytime",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));
//sessions controller middleware
var sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//users controller middleware
var usersController = require('./controllers/users.js');
app.use('/users', usersController);

//stories controller middleware
var storiesController = require('./controllers/stories.js');
app.use('/stories', storiesController);

app.get('/', function(req, res){
    console.log(req.session);
    res.render('index.ejs', {
        currentUser: req.session.currentuser
    });
});


//connections+++++++++++++++++
app.listen(port, function(){
    console.log("listening on port " + port);
});

mongoose.connect(mongoDBURI);

mongoose.connection.once('open', function(){
    console.log('connected to mongo!');
});


// draft: String,
//
// hero:{type: String, required: true},
// mentor:{type: String, required: true},
// ally:{type: String, required: true},
// herald: {type: String, required: true},
// trickster: {type: String, required: true},
// shapeshifter: {type: String, required: true},
// guardian: {type: String, required: true},
// shadow: {type: String, required: true},
// peacefulKingdom: {type:String, required: true},
// callToAction: String,
// superNaturalAide: String,
// firstThreshold:String,
// landOfAdventure: String,
// roadOfTrials: String,
// nightSeaVoyage: String,
// finalTemptation: String,
// apotheosis: String,
// confrontingBigBad: String,
// ultimateBoon: String,
// returnThreshold: String,
// freedomeToLive: String,
// celebration: String
