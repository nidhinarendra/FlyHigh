//The DB uri is ina different file to avoid pushing it into git
const keys = require('../config/keys');
var mongo = require('./mongo');

/*--------------------------working------------------------*/
exports.checkLogin = function(req, res) {
  console.log('entered login function');
  console.log('the details', req.body);
  var email = req.body.email; //req.param("email");
  var password = req.body.password; //param("password");
  var json_responses;

  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    coll.findOne({ email: email, password: password }, function(err, user) {
      if (user) {
        json_responses = {
          statusCode: 200
        };
        req.session.user = user.email;
        res.send(json_responses);
      } else {
        console.log('no user found');
        json_responses = {
          statusCode: 401
        };
        res.send(json_responses);
      }
    });
  });
};
