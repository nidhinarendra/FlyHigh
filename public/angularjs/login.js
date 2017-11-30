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

  $scope.searchf = function () {
      console.log('Inside searchflight function');
      var data1_np = {
          source: $scope.source,
          destination: $scope.destination,
          travel_date: $scope.travel_date

      };
      $http({
          method: 'POST',       //Using http method POST
          url: '/search_oneway',
          headers: {'Content-Type': 'application/json'},
          data: data1_np
      })
          .success(function (data) {         //Check response and redirect user to appropriate page
              if (data.statusCode == 401) {
                  console.log('error finding flight');
                  window.alert('Invalid entry');    //If user is not validated then alert user

                  $scope.unexpected_error = true;
              } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                  window.location.assign('/flightssearch');
                  console.log('delivering flights');
              }
          })
          .error(function (error) {
              $scope.unexpected_error = false;
          });
      // $http({
      //     method: 'GET',
      //     url: '/flightssearch',
      //     headers: { 'Content-Type': 'application/json' }
      // }).success( function (data) {
      //         console.log(data);
      //         window.location.assign('/flightssearch');
      //     }
      // )
      // window.location.assign('/flightssearch');
      // if (($scope.oneway) && ($scope.preferredflights.length != 0)) {
      //       var data1_p = {
      //           source: $scope.source,
      //           destination: $scope.destination,
      //           travel_date: Sscope.travel_date,
      //           preferredflights: $scope.preferredflights
      //       };
      //       $http({
      //           method: 'POST',       //Using http method POST
      //           url: '/oneway_preferred',
      //           headers: {'Content-Type': 'application/json'},
      //           data: data1_p
      //       })
      //           .success(function (data) {         //Check response and redirect user to appropriate page
      //               if (data.statusCode == 401) {
      //                   console.log('error finding flight');
      //                   window.alert('Invalid entry');    //If user is not validated then alert user
      //
      //                   $scope.unexpected_error = true;
      //               } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
      //                   window.location.assign('/flightssearch');
      //               }
      //           })
      //           .error(function (error) {
      //               $scope.unexpected_error = false;
      //           });
      //   }
      //   else if (($scope.oneway) && ($scope.preferredflights.length == 0)) {
      //       var data1_np = {
      //           source: $scope.source,
      //           destination: $scope.destination,
      //           travel_date: Sscope.travel_date
      //
      //       };
      //       $http({
      //           method: 'POST',       //Using http method POST
      //           url: '/search_oneway',
      //           headers: {'Content-Type': 'application/json'},
      //           data: data1_np
      //       })
      //           .success(function (data) {         //Check response and redirect user to appropriate page
      //               if (data.statusCode == 401) {
      //                   console.log('error finding flight');
      //                   window.alert('Invalid entry');    //If user is not validated then alert user
      //
      //                   $scope.unexpected_error = true;
      //               } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
      //                   window.location.assign('/flightssearch');
      //               }
      //           })
      //           .error(function (error) {
      //               $scope.unexpected_error = false;
      //           });
      //   }
      //
      //   else if (($scope.twoway) && ($scope.preferredflights.length != 0)) {
      //       var data2_p = {
      //           source: $scope.source,
      //           destination: $scope.destination,
      //           travel_date: Sscope.travel_date,
      //           return_date: $scope.return_date,
      //           preferredflights: $scope.preferredflights
      //       };
      //       $http({
      //           method: 'POST',       //Using http method POST
      //           url: '/twoway_preferred',
      //           headers: {'Content-Type': 'application/json'},
      //           data: data2_p
      //       })
      //           .success(function (data) {         //Check response and redirect user to appropriate page
      //               if (data.statusCode == 401) {
      //                   console.log('error finding flight');
      //                   window.alert('Invalid entry');    //If user is not validated then alert user
      //
      //                   $scope.unexpected_error = true;
      //               } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
      //                   window.location.assign('/flightssearch');
      //               }
      //           })
      //           .error(function (error) {
      //               $scope.unexpected_error = false;
      //           });
      //   }
      //
      //   else if (($scope.twoway) && ($scope.preferredflights.length == 0)) {
      //       var data2_np = {
      //           source: $scope.source,
      //           destination: $scope.destination,
      //           travel_date: Sscope.travel_date,
      //           return_date: $scope.return_date
      //       };
      //       $http({
      //           method: 'POST',       //Using http method POST
      //           url: '/search_twoway',
      //           headers: {'Content-Type': 'application/json'},
      //           data: data2_np
      //       })
      //           .success(function (data) {         //Check response and redirect user to appropriate page
      //               if (data.statusCode == 401) {
      //                   console.log('error finding flight');
      //                   window.alert('Invalid entry');    //If user is not validated then alert user
      //
      //                   $scope.unexpected_error = true;
      //               } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
      //                   window.location.assign('/flightssearch');
      //               }
      //           })
      //           .error(function (error) {
      //               $scope.unexpected_error = false;
      //           });
      //   }
  };

});
