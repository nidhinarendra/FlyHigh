const keys = require('../config/keys');
var mongo = require('./mongo');

exports.delete_a_user = function(req, res) {
  console.log(Object.keys(req));
  console.log(req.params);
  console.log(req.params.email);
  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    coll.deleteOne({ email: req.params.email }, function(err, user) {
      if (err) {
        res.send('Problem');
      } else {
        res.send('successful');
      }
    });
  });
};
