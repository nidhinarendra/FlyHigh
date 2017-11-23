

var app = angular.module('searchflight', ["ngRoute"]);
app.config(function($routeProvider)
{
    $routeProvider
        .when("/search", {
            templateUrl : "flight_search.htm",
            controller : "searchflight"      //to be edited later
        })

app.controller('searchflight', function($scope, $http) {
    $scope.unexpected_error = true;


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
                    .success(function (response) {         //Check response and redirect user to appropriate page
                        if (data.statusCode == 401) {
                            console.log('error finding flight');
                            window.alert('Invalid entry');    //If user is not validated then alert user

                            $scope.unexpected_error = true;
                        } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                           // window.location.assign('/flight_list');  //need to extract data frm response n provide to next page
                                                                  // get the data from database ($scope.oneway = data.oneway) and provide it
                                                                  // to the next page.
                            $scope.source = response.source
                            $scope.destination = response.destination
                            $scope.price = response.price


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
                    .success(function (response) {         //Check response and redirect user to appropriate page
                        if (data.statusCode == 401) {
                            console.log('error finding flight');
                            window.alert('Invalid entry');    //If user is not validated then alert user

                            $scope.unexpected_error = true;
                        } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                            //window.location.assign('/confirmation');
                            $scope.source = response.source
                            $scope.destination = response.destination
                            $scope.price = response.price
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
                    .success(function (response) {         //Check response and redirect user to appropriate page
                        if (data.statusCode == 401) {
                            console.log('error finding flight');
                            window.alert('Invalid entry');    //If user is not validated then alert user

                            $scope.unexpected_error = true;
                        } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                            //window.location.assign('/confirmation');
                            $scope.source = response.source
                            $scope.destination = response.destination
                            $scope.price = response.price
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
                    return_date: $scope.return_da te
                };
                $http({
                    method: 'POST',       //Using http method POST
                    url: '/search_twoway',
                    headers: {'Content-Type': 'application/json'},
                    data: data2_np
                })
                    .success(function (response) {         //Check response and redirect user to appropriate page
                        if (data.statusCode == 401) {
                            console.log('error finding flight');
                            window.alert('Invalid entry');    //If user is not validated then alert user

                            $scope.unexpected_error = true;
                        } else if (data.statusCode === 200) {     //If user validated successfully redirect to homepage
                            //window.location.assign('/confirmation');
                            $scope.source = response.source
                            $scope.destination = response.destination
                            $scope.price = response.price
                        }
                    })
                    .error(function (error) {
                        $scope.unexpected_error = false;
                    });
            }
        };
});