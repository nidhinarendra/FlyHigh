 /**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./API/user');
var http = require('http');
var path = require('path');
var session = require('client-sessions');
var expressSessions = require('express-session');
var mongoStore = require('connect-mongo')(expressSessions);
var User = require('./routes/mongo'); //created model loading here
var bodyParser = require('body-parser');

var app = express();

var login = require('./routes/login');
var index = require('./routes/index');
var registerService = require('./API/registerService');
var getuser = require('./API/getUser');
var updateuser = require('./API/updateUser');
var deleteuser = require('./API/deleteUser');
var checklogin = require('./API/checklogin_service');
var search_flights = require('./API/search_flights');
var bookflight = require('./API/bookflight');

app.use(
  expressSessions({
    secret: 'webarchitects',
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
      url: 'mongodb://FlyHigh:webarchitects280@ds231205.mlab.com:31205/flyhigh'
    })
  })
);

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//RESTful API call Routes
app.post('/register', registerService.create_a_user);
app.post('/checklogin', checklogin.checkLogin); //Checklogin_service.checkLogin
app.get('/login', login.login);
app.get('/home', routes.home);


app.delete('/deleteuser/:email', deleteuser.delete_a_user);
app.put('/updateuser/:username', updateuser.update_a_user);
app.get('/getuser/:username', getuser.get_user_details);
app.get('/Listuser', user.list); //Not Working
app.get('/admin', routes.admin);
app.get('/users', getuser.get_user_details);
app.get('/adminhome', routes.adminhome);
app.post('/checkadminlogin', checklogin.checkadminLogin);
app.get('/userArray', getuser.get_user_details);

//API calls for flights
app.post('/search_oneway',search_flights.get_flights_oneway);
app.post('/search_twoway',search_flights.get_flights_twoway);
app.post('/oneway_preferred',search_flights.get_preferred_flights_oneway);
app.post('/twoway_preferred',search_flights.get_preferred_flights_twoway);
app.post('/book_flight',bookflight.post_user_flight);       //Route to call when on-click book flight!
app.post('/get_booking',bookflight.get_user_flight);        //Route to call when on-load booking confirmation and current-bookings tab

// app.get('/getallusers',)

//Internal Routes
app.get('/', routes.index);

// app.post('/register', login.register);
app.get('/homepage', login.redirectToHomepage);
app.get('/logout', function(req, res) {
  console.log('logout clicked');
  req.session.destroy();
  // window.location.assign('/login');
  res.redirect('/login');
});



http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
