var adminhome = angular.module('adminhome', ['xeditable']);
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
  
  $scope.saveTable = function() {
	  console.log("in save table");  
    var results = [];
    for (var i = $scope.users.length; i--;) {
      var item = $scope.users[i];
      // actually delete user
      if (item.isDeleted) {
        $scope.users.splice(i, 1);
      }
      // mark as not new
      if (item.isNew) {
        item.isNew = false;
      }
    }
    
    // send on server
  };
	  
});
