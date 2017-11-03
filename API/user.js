'use strict'
/*
 * GET users listing.
 */
var mongoose = require('mongoose')
// var User = mongoose.model('Users');

exports.list = function(req, res){
    var db = req.db;
    var dbCollections = db.collections;
    var userlist = [];
    // var usernames = [];
    console.log('The ListUser service is being executed');
    dbCollections.users.find().forEach(function(doc){
        userlist.push(doc);
    });
    console.log(userlist);
    // dbCollections.users.find(function (err,docs) {
    //     if(err){
    //         res.send("No Users Registered");
    //     }
    //     else{
    //         res.send(JSON.stringify(docs));
    //     }
    // });
    // for(var i=0; i<users.length; i++) {
    //     usernames.push(users[i].username);
    // }
    // console.log("Users are:- " +usernames);
    // if (usernames.length === 0) {
    //     res.send("No Users Registered");
    // }
    // else {
    //     res.send(usernames);
    // }
};
