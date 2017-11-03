var adminhome = angular.module('adminhome', []);
adminhome.controller('adminhome', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/userArray',
    headers: { 'Content-Type': 'application/json' }
  })
    .success(function(data) {
      $scope.users = data.resResult;
      console.log('inside adminhome angular');
      console.log(data.resResult);
      //window.location.assign('/users');
    })
    .error(function(error) {
      console.log(error);
    });

  $scope.userArray = function() {
    $http({
      method: 'GET',
      url: '/userArray',
      headers: { 'Content-Type': 'application/json' }
    })
      .success(function(data) {
        $scope.users = data.resResult;
        console.log('inside adminhome angular');
        console.log(data.resResult);
        //window.location.assign('/users');
      })
      .error(function(error) {
        console.log(error);
      });
  };
});
