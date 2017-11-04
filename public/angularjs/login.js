//loading the 'login' angularJS module
console.log('Inside login.js');
var login = angular.module('login', []);
login.controller('login', function($scope, $http) {
  $scope.invalid_login = true;
  $scope.unexpected_error = true;
  console.log('Inside login');
  /*--------------------------------Function to receive data from user login page(login.html) and call backend service(checklogin_service.js)---------*/
  $scope.signIn = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    };
    console.log('Inside signIn function ' + $scope.email);
    $http({
      method: 'POST',       //Using http method POST
      url: '/checklogin',
      headers: { 'Content-Type': 'application/json' },
      data: data
    })
      .success(function(data) {         //Check response and redirect user to appropriate page
        if (data.statusCode == 401) {
          console.log('error finding user');
          window.alert('Invalid email or password');    //If user is not validated then alert user
          $scope.invalid_login = true;
          $scope.unexpected_error = true;
        } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
          window.location.assign('/home');
        }
      })
      .error(function(error) {
        $scope.unexpected_error = false;
        $scope.invalid_login = true;
      });
  };
    /*--------------------------------Function to receive data from admin login page(adminlogin.html) and call backend service (/checklogin)---------*/
  $scope.adminsignIn = function() {
    var data = {
      email: $scope.email,
      password: $scope.password
    };
    console.log('Inside admin signIn function ' + $scope.email);
    $http({
      method: 'POST',
      url: '/checkadminlogin',        //routes to backend API provided in app.js
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
    /*--------------------------------Function to receive data from user registration page(register.html) and call backend service (/register)---------*/
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
      method: 'POST',         //http method POST used
      url: '/register',       //routes to backend API provided in app.js
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

});
