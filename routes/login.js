'use strict';
//
// exports.checkLogin = function(req, res) {
// 	var email = req.body.email;             //req.param("email");
// 	var password = req.body.password;       //param("password");
// 	var json_responses;
//     console.log('Redirecting the registered user to Homepage..');
//
//     var db = req.db;
//     console.log("Accessing User from DB");
//     //var collection = db.getCollection('users');
//     var dbCollections = db.collections;
//     /*-------------------------------------DB find Query---------------------------------------------------*/
//     dbCollections.users.findOne({email : email, password : password}, function(err, doc){
//         if(doc) {
//             if(password === doc.password){          ///Validating the user password by comparing it to the one stored in DB
//                 console.log("Saving the data from DB to sessions");
//                 req.session.email = doc.email;
//                 req.session.name = doc.username;
//                 req.session.lastname = doc.lastname;
//                 req.session.id = 1;
//
//                 json_responses = {
//                     "statusCode" : 200
//                 };
//                 res.send(json_responses);
//             }
//         }
//         else{
//             json_responses = {
//                 "statusCode" : 401
//             };
//             res.send(json_responses);
//         }
//
//     });
//     db.close();
// };
    // if(err) throw err;
    // if(doc)
    //     console.log("Found: " + username + ", pass=" + doc.password);
    // else
    //     console.log("Not found: " + username);
    // db.close();


// dbCollections.users.insert(user, function (err, records) {
//     if (err) {
//         res.send("There was a problem.");   // If it failed, return error
//     }
//     else {
//         res.send('Successful');    			// And forward to success page --> angularjs/login.js
//     }
// });

exports.redirectToHomepage = function(req, res) {
    if (req.session_express.email && req.session_express.name) {
        res.header(     'Cache-Control',
            'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.sendfile('public/homepage.html');
    } else {
        res.redirect('/');
    }
};


exports.logout = function(req, res) {
    req.session_express.destroy();
    res.redirect('/');
};


























// exports.register = function(req, res) {/*
// 	var email = req.param("email");
// 	var password = req.param("password");
// 	var firstname = req.param("firstname");
// 	var lastname = req.param("lastname");
// 	var birthday = req.param("birthday");
// 	var json_responses;
// 	var dt = new Date();
//
// 	req.session.email = email;
// 	req.session.name = firstname;
// 	req.session.lastname = lastname;
// 	req.session.id = 1;
// 	req.session.birthday = birthday;
// 	json_responses = {
// 		"statusCode" : 200
// 	};
// 	res.send(json_responses);*/
//
// 	var json_responses;
// var db = req.db;
//
// var firstname = req.body.firstname;
// var lastname = req.body.lastname;
// var email = req.body.email;
// var password = req.body.password;
// var gender= req.body.gender;
// var birthday = req.body.birthday;
// var phone = req.body.phone;
// console.log('Adding Users to Database..');
// var usercollection = db.get('users');
// usercollection.insert( { "username" : firstname,
//     "firstname": firstname,
//     "lastname": lastname,
//     "email"  : email,
//     "password": password,
//     "gender" : gender,
//     "birthday" : birthday,
//     "contact": phone}, function (err, doc) {
//     if (err)
//     {
//         // If it failed, return error
//         res.send("There was a problem.");
//     }
//     else
//     {
//         // And forward to success page
//         res.redirect("../login");
//     }
//
//
// });
//
//     // json_responses = {
//     //     "statusCode" : 200
//     // };
//     // res.send(json_responses);
//
// };

