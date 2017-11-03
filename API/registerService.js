// 'use strict';
//
// var mongoose = require('mongoose');
//     // User = mongoose.model('Users');
//
//
//
// /* .........List of all Registered Users in DATABASE:_ Users.......... */
// //
// // exports.list_all_users = function(req, res) {
// //     User.find({}, function(err, user) {
// //         if (err)
// //             res.send(err);
// //         res.json(user);
// //     });
// // };s
//
// /* ....Send User(POST) Info to Backend(Save in DATABASE)..... */
//
// exports.create_a_user = function(req, res) {
//     var db = req.db;
//     var dbCollections = db.collections;
//     // var new_user = User(req.body);
//     console.log("you have reached inside create a user " + JSON.stringify(req.body.firstname));
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;
//     var email = req.body.email;
//     var password = req.body.password;
//     var gender = req.body.gender;
//     var birthday = req.body.birthday;
//     var phone = req.body.phone;
//     console.log('Adding Users to Database..');
//     var user = {
//         "username": firstname,
//         "firstname": firstname,
//         "lastname": lastname,
//         "email": email,
//         "password": password,
//         "gender": gender,
//         "birthday": birthday,
//         "contact": phone
//     };
//     // new_user.save(function (err, records) {
//     //     if (err) {
//     //         res.send("There was a problem.");   // If it failed, return error
//     //     }
//     //     else {
//     //         res.send('Successful');    // And forward to success page  --> angularjs/login.js
//     //     }
//     // });
//
//
//     dbCollections.users.insert(user, function (err, records) {
//         if (err) {
//             res.send("There was a problem.");   // If it failed, return error
//         }
//         else {
//             res.send('Successful');    // And forward to success page  --> angularjs/login.js
//         }
//     });
// };

/*------------------------------------------------------*/


var mongoose = require('mongoose');
  var  User = mongoose.model('Users');


/*-------------------------Working---------------------*/
/* .........List of all Registered Users in DATABASE:_ Users.......... */
//
// exports.list_all_users = function(req, res) {
//     User.find({}, function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };

/* ....Send User(POST) Info to Backend(Save in DATABASE)..... */

exports.create_a_user = function(req, res) {
    var db = req.db;
    var dbCollections = db.collections;
    console.log("you have reached inside create a user " + JSON.stringify(req.body.firstname));
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var gender = req.body.gender;
    var birthday = req.body.birthday;
    var phone = req.body.phone;
    console.log('Adding Users to Database..');
    var user = {
        "username": firstname,
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password,
        "gender": gender,
        "birthday": birthday,
        "contact": phone
    };

    dbCollections.users.insert(user, function (err, users) {
        if (err) {
            res.send("There was a problem.");   // If it failed, return error
        }
        else {
            res.send('Successful');    // And forward to success page  --> angularjs/login.js
        }
    });
};

//
// User.save(function(err, user) {
//
//      if (err)
//          res.send(err);
//      res.json(user);
//  });
