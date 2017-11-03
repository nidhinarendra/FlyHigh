var mongoose = require('mongoose');
// mongoose.connect('mongodb://FlyHigh:webarchitects280@ds231205.mlab.com:31205/flyhigh');
/*--------------------------------------------------------NOT USING MONGOOSE SCHEMA___________________________________??---------*/
var Schema = mongoose.Schema;


/*--------------------------Model-------------------------*/
                        /*User schema*/
var UserSchema = new Schema({
    username : String,
    firstname: String,
    lastname: String,
    email  : {type: String,
              required: true,
              unique: true},
    password: {type: String,
               required: true},
    gender : String,
    birthday : Date,
    contact: Number
}, {collection: 'users'});

// var Users = mongoose.model('Users',UserSchema);
// module.exports = Users;

module.exports = mongoose.model('Users',UserSchema);
                    /*Flight schema*/
/*
var FlightSchema = new Schema({
    Flight schema
}
})
*/
/*------------------------------------------------------Routes--------------------------------------------------------*/
// 'use strict';
// module.exports = function(app) {
//     // var todoList = require('../API/todoListController');
//     var pushtobackend = require('../API/registerController');
//
//     // // todoList Routes
//     // app.route('/tasks')
//     //     .get(todoList.list_all_tasks)
//     //     .post(todoList.create_a_task);
//
//     app.route('/register')
//         .post(pushtobackend.create_a_user);
//
//     app.route('/tasks/:taskId')
//         .get(todoList.read_a_task)
//         .put(todoList.update_a_task)
//         .delete(todoList.delete_a_task);
// };

/*---------------------------------------------------------Controllers------------------------------------------------*/
// 'use strict';
//
//
// var mongoose = require('mongoose'),
//     User = mongoose.model('Users');
//
// /* .........List of all Registered Users in DATABASE:_ Users.......... */
//
// exports.list_all_users = function(req, res) {
//     User.find({}, function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };
//
// /* ....Send User(POST) Info to Backend(Save in DATABASE)..... */
//
// exports.create_a_user = function(req, res) {
//     var new_user = new User(req.body);
//     new_user.save(function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };
//
// /*.......Get a User.............*/
//
// exports.read_a_user = function(req, res) {
//     Task.findById(req.params.email, function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };
//
// /*.....Update a User's Details.....*/
//
// exports.update_a_user = function(req, res) {
//     Task.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
//         if (err)
//             res.send(err);
//         res.json(user);
//     });
// };
//
//
// /*.....Delete a User.......*/
//
// exports.delete_a_task = function(req, res) {
//     Task.remove({
//         _id: req.params.taskId
//     }, function(err, task) {
//         if (err)
//             res.send(err);
//         res.json({ message: 'Task successfully deleted' });
//     });
// };
//
