//Using mongoose as the middleware to access mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//The DB uri is in a different file to avoid pushing it into git
const keys = require('../config/keys');

//Connecting to the database via mongoose
mongoose.connect(keys.mongoURI, function(err, result) {
  if (err) {
    console.log('error');
  } else {
    console.log('Successfully connected to db');
  }
});

//creating a schema for the registration process
var UserSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  gender: String,
  birthday: String,
  contact: String
});

//creating a new model for the schema
var User = mongoose.model('User', UserSchema);

exports.create_a_user = function(req, res, next) {
  console.log('inside create user');
  //creating a new instance of the model for inserting a new user
  var user = new User(req.body);

  console.log(
    'you have reached inside create a user ',
    JSON.stringify(req.body)
  );

  user.save(function(err, user) {
    if (err) {
      return next(err);
    }
    res.send('Successful');
  });
  console.log('Users added to Database..');
};
