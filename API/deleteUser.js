'use strict'
/*--------------------------Working----------------------*/
var mongoose = require('mongoose');
    // User = mongoose.model('Users');

exports.delete_a_user = function(req,res){
    var db = req.db;
    var dbCollection = db.collections.users;
    var username = req.params.username;
    console.log('The delete service is being executed for : ' + username);
    dbCollection.deleteOne({username: username}, function (err, user) {
        if (err) {
            res.send("There was a problem.");   // If it failed, return error
        }
        else {
            res.send('Successful');    // And forward to success page  --> angularjs/login.js
        }
    });
};