/*
 * GET registration page.
 */

exports.index = function(req, res) {
  res.sendfile('public/register.html');
};

exports.home = function(req, res) {
  res.sendfile('public/homepage.html');
};

exports.admin = function(req, res) {
  res.sendfile('public/adminlogin.html');
};

exports.adminhome = function(req, res) {
  res.sendfile('public/adminhome.html');
};
