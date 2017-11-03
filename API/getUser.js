'use strict'
/**--------------------WORkING!!---------------**/
var mongoose = require('mongoose');
    // User = mongoose.model('Users')

exports.get_user_details = function (req, res) {
    var db = req.db;
    var dbCollections = db.collections.users;

    console.log('The getUser service is being executed for collection:' + (dbCollections.users));
    var username = req.params.username;
    console.log('getuser: ' + username);
    dbCollections.findOne({username: username}, function (err, user) {
        if (user) {
            res.send(user);   // If it failed, return error
        }
        else {
            res.send("There was a problem.");
            console.log('getuser: ' + username);
            // res.send('Successful');    // And forward to success page  --> angularjs/login.js
        }
    });
};