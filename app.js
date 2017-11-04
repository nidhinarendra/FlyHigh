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
app.post('/checklogin', checklogin.checkLogin);
app.get('/login', login.login);

app.delete('/deleteuser/:username', deleteuser.delete_a_user);
app.put('/updateuser/:username', updateuser.update_a_user);
app.get('/getuser/:username', getuser.get_user_details);
app.get('/Listuser', user.list); //Not Working

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
