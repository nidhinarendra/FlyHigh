
var searchFlight = angular.module('searchFlight', []);
searchFlight.controller('searchFlight', function($scope, $http) {
    // $scope.unexpected_error = true;


    $scope.searchflight = function () {

        if (($scope.oneway) && ($scope.preferred_flights != null)) {
            var data1_p = {
                source: $scope.source,
                destination: $scope.destination,
                travel_date: Sscope.travel_date,
                preferred_flights: $scope.preferred_flights
            };
            $http({
                method: 'POST',       //Using http method POST
                url: '/oneway_preferred',
                headers: {'Content-Type': 'application/json'},
                data: data1_p
            })
                .success(function (data) {         //Check response and redirect user to appropriate page
                    if (data.statusCode == 401) {
                        console.log('error finding flight');
                        window.alert('Invalid entry');    //If user is not validated then alert user

                        $scope.unexpected_error = true;
                    } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                        window.location.assign('/confirmation');
                    }
                })
                .error(function (error) {
                    $scope.unexpected_error = false;
                });
        }
        else if (($scope.oneway) && ($scope.preferred_flights == null)) {
            var data1_np = {
                source: $scope.source,
                destination: $scope.destination,
                travel_date: Sscope.travel_date,

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
                        window.location.assign('/flights_search');
                    }
                })
                .error(function (error) {
                    $scope.unexpected_error = false;
                });
        }

        else if (($scope.twoway) && ($scope.preferred_flights != null)) {
            var data2_p = {
                source: $scope.source,
                destination: $scope.destination,
                travel_date: Sscope.travel_date,
                return_date: $scope.return_date,
                preferred_flights: $scope.preferred_flights
            };
            $http({
                method: 'POST',       //Using http method POST
                url: '/twoway_preferred',
                headers: {'Content-Type': 'application/json'},
                data: data2_p
            })
                .success(function (data) {         //Check response and redirect user to appropriate page
                    if (data.statusCode == 401) {
                        console.log('error finding flight');
                        window.alert('Invalid entry');    //If user is not validated then alert user

                        $scope.unexpected_error = true;
                    } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                        window.location.assign('/confirmation');
                    }
                })
                .error(function (error) {
                    $scope.unexpected_error = false;
                });
        }

        else if (($scope.twoway) && ($scope.preferred_flights == null)) {
            var data2_np = {
                source: $scope.source,
                destination: $scope.destination,
                travel_date: Sscope.travel_date,
                return_date: $scope.return_date
            };
            $http({
                method: 'POST',       //Using http method POST
                url: '/search_twoway',
                headers: {'Content-Type': 'application/json'},
                data: data2_np
            })
                .success(function (data) {         //Check response and redirect user to appropriate page
                    if (data.statusCode == 401) {
                        console.log('error finding flight');
                        window.alert('Invalid entry');    //If user is not validated then alert user

                        $scope.unexpected_error = true;
                    } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                        window.location.assign('/confirmation');
                    }
                })
                .error(function (error) {
                    $scope.unexpected_error = false;
                });
        }
    };
});