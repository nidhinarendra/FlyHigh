exports.login = function(req, res) {
  res.sendfile('public/login.html');
};

exports.redirectToHomepage = function(req, res) {
  if (req.session_express.email && req.session_express.name) {
    res.header(
      'Cache-Control',
      'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    );
    res.sendfile('public/homepage.html');
  } else {
    res.redirect('/');
  }
};

exports.logout = function(req, res) {
  req.session_express.destroy();
  res.redirect('/');
};
