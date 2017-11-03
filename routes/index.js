
/*
 * GET home page.
 */
var express = require('express');
var router = express.Router();
var app =express();
//
// app.get('/', function(req, res, next) {
//     res.render('index', { title: 'Express' });
// });


// router.get('../public/register.html', function () {
//     res.render('register', { title: 'Register' })
// })



//GET USERS from register.html

// router.get('/',function(req,res){
//     res.render('index', { title: 'Express' });
//
//     console.log("No error.");
// });

/* ------------------------Logic for inserting data in database ------------------------ */

// var function2 = function(req,res){
//     var db = req.db;
//
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;
//     var email = req.body.email;
//     var password = req.body.password;
//     var gender= req.body.gender;
//     var birthday = req.body.birthday;
//     var phone = req.body.phone;
//     console.log('Adding Users to Database..');
//     var usercollection = db.get('users');
//     usercollection.insert( { "username" : firstame,
//         "firstname": firstname,
//         "lastname": lastname,
//         "email"  : email,
//         "password": password,
//         "gender" : gender,
//         "birthday" : birthday,
//         "contact": phone}, function (err, doc) {
//         if (err)
//         {
//             // If it failed, return error
//             res.send("There was a problem.");
//         }
//         else
//         {
//             // And forward to success page
//             res.redirect("../homepage");
//         }
//     });
// }


exports.index = function(req, res){
    res.sendfile('public/register.html');
};

//module.exports = function2;

//exports.index=function2;

