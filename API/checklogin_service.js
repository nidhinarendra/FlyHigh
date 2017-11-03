'use strict'

var mongoose = require('mongoose');
    // User = mongoose.model('Users');
/*--------------------------working------------------------*/
exports.checkLogin = function(req, res) {
    var email = req.body.email;             //req.param("email");
    var password = req.body.password;       //param("password");
    var json_responses;
    console.log('Redirecting the registered user to Homepage..');

    //Admin Credentials

    var admin_email = 'admin@gmail.com';
    var admin_password = "webarchitects";

    var db = req.db;
    console.log("Accessing User from DB");
    //var collection = db.getCollection('users');
    var dbCollections = db.collections.users;
    /*-------------------------------------DB find Query---------------------------------------------------*/
    dbCollections.findOne({email : email, password : password}, function(err, doc){
        if(doc) {
            if (admin_email === doc.email && admin_password === doc.password) {
                console.log("admin access . . .");

                req.session.email = doc.email;
                req.session.name = doc.username;
                req.session.lastname = doc.lastname;
                req.session.id = 1;
                json_responses = {
                    "statusCode": 200,
                    "admin": true
                };
                res.send(json_responses);

            }
            else if (admin_email !== doc.email && admin_password !== doc.password) {

                if (password === doc.password) {

                    console.log("Saving the data from DB to sessions");
                    req.session.email = doc.email;
                    req.session.name = doc.username;
                    req.session.lastname = doc.lastname;
                    req.session.id = 1;

                    json_responses = {
                        "statusCode": 200,
                        "admin": false
                    };
                    res.send(json_responses);
                }
            }
            // if(password === doc.password){          ///Validating the user password by comparing it to the one stored in DB
            //     console.log("Saving the data from DB to sessions");
            //     req.session.email = doc.email;
            //     req.session.name = doc.username;
            //     req.session.lastname = doc.lastname;
            //     req.session.id = 1;
            //
            //     json_responses = {
            //         "statusCode" : 200
            //     };
            //     res.send(json_responses);
            // }
        }
        else{
            json_responses = {
                "statusCode" : 401
            };
            res.send(json_responses);
        }

    });
    db.close();
};
