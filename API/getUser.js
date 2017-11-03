/**--------------------WORkING!!---------------**/
const keys = require('../config/keys');
var mongo = require('./mongo');
// User = mongoose.model('Users')

exports.get_user_details = function(req, res) {
  console.log('entered admin homepage users get function');
  var json_response = {};
  mongo.connect(keys.mongoURI, function() {
    var coll = mongo.collection('users');
    var usersList = coll.find({}).toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      json_response = {
        resResult: result
      };
      res.send(json_response);
    });
  });
};
