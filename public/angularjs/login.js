//loading the 'login' angularJS module
console.log('Inside login.js');
var login = angular.module('login', []);
login.controller('login', function($scope, $http) {
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
    console.log('Inside login');
	$scope.signIn = function() {
		var data = {
            "email" : $scope.email,
            "password" : $scope.password
        }
        console.log('Inside signIn function ' + $scope.email);
		$http({
			method : "POST",
			url : '/checklogin',
            headers: {'Content-Type': 'application/json'},
			data : data
		}).success(function(data){
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else if (data.statusCode === 200 && data.admin === true){
				window.location.assign("/admin.html");
			}
			else if (data.statusCode === 200 && data.admin === false) {
                window.location.assign("/homepage.html");
            }
			// if (data.statusCode == 401) {
			// 	$scope.invalid_login = false;
			// 	$scope.unexpected_error = true;
			// } else
			// 	window.location.assign("/homepage.html");
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};

	$scope.register = function() {
        var data = {
        	"username" : $scope.firstname,
            "firstname": $scope.firstname,
            "lastname": $scope.lastname,
            "email"  : $scope.email,
            "password": $scope.password,
            "gender" : $scope.gender,
            "birthday" : $scope.birthday,
            "contact": $scope.phone
		};
		$http({
			method : "POST",
			url : '/register',
            headers: {'Content-Type': 'application/json'},
            data : data

		}).success(function(data) {
			window.location.assign("/login.html");
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
	};
})
