var adminhome = angular.module('adminhome', ['xeditable']);
adminhome.controller('adminhome', function($scope, $http) {
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
    console.log('in save table');
    var results = [];
    for (var i = $scope.users.length; i--; ) {
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

  $scope.removeRow = function(email) {
    var index = -1;
    for (var i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i].email === email) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      alert('Something gone wrong');
    }
    $scope.users.splice(index, 1);
    console.log(email);

    $http({
      method: 'DELETE',
      url: '/deleteuser/' + email
    })
      .success(function() {
        console.log('user deleted in the database');
      })
      .error(function(error) {
        console.log(error);
      });
  };
});
