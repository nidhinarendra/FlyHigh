'use strict'

var mongoose = require('mongoose');
// var User = mongoose.model('Users');
/*----------------------------Working--------------------------------*/
exports.update_a_user = function(req, res) {
    var db = req.db;
    var dbCollections = db.collections.users;
    var username = req.params.username;
    console.log("you have reached inside update a user " + username);

    console.log('Updating a user in database..');

    dbCollections.update({username: username},
        {$set: req.body}, function (err, user) {
            if (err) {
                res.send("There was a problem.");   // If it failed, return error
            }
            else {
                res.send('Successful');    // And forward to success page  --> angularjs/login.js
            }
        });
};