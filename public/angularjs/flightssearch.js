// var flights_Search = angular.module('flights_Search', []);
// console.log('Inside homepage.js');
//
// // login.controller('login', function($scope, $http) {
// flights_Search.controller('flights_Search', function($scope, $http) {
//     // $scope.unexpected_error = true;
//     // window.alert('Invalid entry');
//     console.log('Inside flights_Search controller');
//     $scope.flights_Search = function () {
//         console.log('Inside searchflight function');
//
//         $http({
//             method: 'GET',
//             url: '/confirmation',
//             headers: { 'Content-Type': 'application/json' }
//         }).success( function (data) {
//                 console.log(data);
//                 window.location.assign('/flightssearch');
//             }
//         )
//         // window.location.assign('/flightssearch');
//     };
// });