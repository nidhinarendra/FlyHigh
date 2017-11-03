//loading the 'login' angularJS module
console.log('Inside login.js');
var login = angular.module('login', []);
login.controller('login', function($scope, $http) {
  $scope.invalid_login = true;
  $scope.unexpected_error = true;
  console.log('Inside login');
  $scope.signIn = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    };
    console.log('Inside signIn function ' + $scope.email);
    $http({
      method: 'POST',
      url: '/checklogin',
      headers: { 'Content-Type': 'application/json' },
      data: data
    })
      .success(function(data) {
        if (data.statusCode == 401) {
          console.log('error finding user');
          window.alert('Invalid email or password');
          $scope.invalid_login = true;
          $scope.unexpected_error = true;
        } else if (data.statusCode === 200) {
          window.location.assign('/home');
        }
      })
      .error(function(error) {
        $scope.unexpected_error = false;
        $scope.invalid_login = true;
      });
  };

  $scope.adminsignIn = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    };
    console.log('Inside admin signIn function ' + $scope.email);
    $http({
      method: 'POST',
      url: '/checkadminlogin',
      headers: { 'Content-Type': 'application/json' },
      data: data
    })
      .success(function(data) {
        if (data.statusCode == 401) {
          console.log('error finding user');
          window.alert('Invalid email or password');
          $scope.invalid_login = true;
          $scope.unexpected_error = true;
        } else if (data.statusCode === 200) {
          window.location.assign('/adminhome');
        }
      })
      .error(function(error) {
        $scope.unexpected_error = false;
        $scope.invalid_login = true;
      });
  };

  $scope.register = function() {
    var data = {
      username: $scope.firstname,
      firstname: $scope.firstname,
      lastname: $scope.lastname,
      email: $scope.email,
      password: $scope.password,
      gender: $scope.gender,
      birthday: $scope.birthday,
      contact: $scope.phone
    };
    $http({
      method: 'POST',
      url: '/register',
      headers: { 'Content-Type': 'application/json' },
      data: data
    })
      .success(function(data) {
        window.location.assign('/login');
      })
      .error(function(error) {
        $scope.unexpected_error = false;
      });
  };
  $scope.register = function(req, res) {
    req.session.destroy();
    window.location.assign('/login');
  };
});
