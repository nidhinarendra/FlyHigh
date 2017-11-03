var admin = angular.module('admin_login', []);
admin.controller('admin_controller', function($scope, $http) {
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    //var username = $scope.username;
    //console.log("send "+username);
    $scope.delete_user = function(){
    //     var data = {
    //         "username": $scope.username
    // }
        $http({
            method : "DELETE",
            url : '/deleteuser/'+$scope.username,
            headers: {'Content-Type': 'application/json'}
            //data : data
        }).success(function(data) {
            window.location.assign("/");
        }).error(function(error) {
            $scope.unexpected_error = false;
        });
    };

    $scope.update_user = function(){
        var data = {
            "username": $scope.firstname,
            "firstname": $scope.firstname,
            "lastname": $scope.lastname,
            "email": $scope.email,
            "gender": $scope.gender,
            "birthday": $scope.birthday,
            "contact": $scope.phone
        };
        for (var key in data) {         ///Code to filter
            if (data.hasOwnProperty(key)) {
                if(data[key]===null){
                    delete data[key];
                }
            }
        }
        $http({
            method : "PUT",
            url : '/updateuser/' + $scope.firstname,
            headers: {'Content-Type': 'application/json'},
            data : data
        }).success(function(data) {
            window.location.assign("/");
        }).error(function(error) {
            $scope.unexpected_error = false;
        });
    };

    $scope.find_user = function(){
    //     var data = {
    //         "username": $scope.username2
    // }
        $http({
            method : "GET",
            url : '/getuser/'+$scope.username2,
            headers: {'Content-Type': 'application/json'},
            // data : data
        }).success(function(data) {
            window.location.assign("/");
            console.log('found user: ' + data.username);
        }).error(function(error) {
            $scope.unexpected_error = false;
        });
    };
})
