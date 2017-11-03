/*
 * GET registration page.
 */

exports.index = function(req, res) {
  res.sendfile('public/register.html');
};
