const keys = require('../config/keys');
var mongo = require('./mongo');
/*-------------------------------Working-------------------------------*/
console.log("inside search_flights");
exports.get_flights_oneway = function(req, res) {
    console.log(Object.keys(req));
    var source = req.body.source;
    var destination = req.body.destination;
    var date = req.body.travel_date;
    // console.log(req.params);
    // console.log(req.params.email);
    mongo.connect(keys.mongoURI, function() {
        var coll = mongo.collection('simulatedFlightData');
        console.log("u r inside the get_flights_oneway ");
       // var flightslist = [{source : "SFO"}];
        console.log("1");
    // , destination: destination, Date: date

        var flightslist = coll.find({source:source, destination:destination, Date:date}).toArray(function(err, result) {

            if (err) throw err;
            // console.log(result);
            json_response = {
                resResult: result
            };
            console.log("hi", JSON.stringify(json_response));
            res.send(json_response);
        });
        // console.log("list of flights: " + flightslist[0]);
    });
};

// ==============================Working===================================================================

exports.get_preferred_flights_oneway = function(req, res) {
    console.log(Object.keys(req));
    var source = req.body.source;
    var destination = req.body.destination;
    var date = req.body.travel_date;
    var preferred = req.body.preferred_flights;
    // console.log(req.params);
    // console.log(req.params.email);
    mongo.connect(keys.mongoURI, function() {
        var coll = mongo.collection('simulatedFlightData');
        console.log("u r inside the get_flights_oneway ");
        // var flightslist = [{source : "SFO"}];
        console.log("1");
        // , destination: destination, Date: date

        var flightslist = coll.find({source:source, destination:destination, Date:date}).toArray(function(err, flights) {
            console.log("Not sorted flights",flights)
            if (err) throw err;
            for( var j=0; j< preferred.length; j++) {
                for( var i =0;i< flights.length; i++){
                    if (flights[i].fligtName === preferred[j]) {
                        flights.splice(0, 0, flights[i]);
                        console.log("current",j,flights);
                        flights.splice(i+1,1);
                        console.log("next",j,flights);
                    }
                }
            }
            console.log("The preferred flights are: ",flights);
            // console.log(result);
            json_response = {
                resResult: flights
            };
            // console.log("hi"+json_response);
            res.send(json_response);
        });
        // console.log("list of flights: " + flightslist[0]);
    });
};



/*coll.findOne({srcIata: source}), function(err,doc){
            console.log("inside for each" + JSON.stringify(flightslist))
            if (err) throw err;

            else {

                flightslist.push(doc);
                // console.log("inside for each"+JSON.stringify(flightslist))
            }
        };

        json_response = {
            resResult: flightslist
        };
        res.send(json_response);//
        console.log('the flights data is: ' + flightslist[0]);*/
        // var flightsList = coll.find({source: source, destination: destination, Date: date}).toArray(function(err, result) {
        //
        //     if (err) throw err;
        //     // console.log(result);
        //     json_response = {
        //         resResult: result
        //     };
        //     res.send(json_response);
        // });
        // console.log(JSON.stringify(flightsList));

/*-------------------------------------------Working------------------------------*/
exports.get_flights_twoway = function(req, res) {
    console.log(Object.keys(req));
    var source = req.body.source;
    var destination = req.body.destination;
    var travel_date = req.body.travel_date;
    var return_date = req.body.return_date;

    mongo.connect(keys.mongoURI, function() {
        var coll = mongo.collection('simulatedFlightData');

        coll.find({source: source, destination: destination, Date: travel_date}).toArray(function(err, result) {
            if (err) throw err;

            get_returnflights(result);
        });
    });

    get_returnflights = function(result) {
        // var preferred_flight_name = req.body.flight_name;

        mongo.connect(keys.mongoURI, function () {
            var coll = mongo.collection('simulatedFlightData');

            coll.find({
                source: destination,
                destination: source,
                Date: return_date
            }).toArray(function (error, returnflights) {
                if (error) throw error;
                // console.log(result);
                json_response = {
                    flightslist: result,
                    returnlist: returnflights
                };
                res.send(json_response);

            });
        });
    }
};
// ===========================Working==================================================
exports.get_preferred_flights_twoway = function(req, res) {
    console.log(Object.keys(req));
    var source = req.body.source;
    var destination = req.body.destination;
    var travel_date = req.body.travel_date;
    var return_date = req.body.return_date;
    var preferred = req.body.preferred_flights;
    mongo.connect(keys.mongoURI, function() {
        var coll = mongo.collection('simulatedFlightData');

        coll.find({source: source, destination: destination, Date: travel_date}).toArray(function(err, flights) {
            if (err) throw err;
            for( var j=0; j< preferred.length; j++) {
                for( var i =0;i< flights.length; i++){
                    if (flights[i].fligtName === preferred[j]) {
                        flights.splice(0, 0, flights[i]);
                        console.log("current",j,flights);
                        flights.splice(i+1,1);
                        console.log("next",j,flights);
                    }
                }
            }
            get_returnflights(flights);
        });
    });

    get_returnflights = function(flights) {
        var preferred_flight_name = req.body.flight_name;

        mongo.connect(keys.mongoURI, function () {
            var coll = mongo.collection('simulatedFlightData');

            coll.find({
                source: destination,
                destination: source,
                Date: return_date
            }).toArray(function (error, returnflights) {
                if (error) throw error;
                // console.log(result);
                for( var j=0; j< preferred.length; j++) {
                    for( var i =0;i< returnflights.length; i++){
                        if (returnflights[i].fligtName === preferred[j]) {
                            returnflights.splice(0, 0, returnflights[i]);
                            console.log("returncurrent",j,returnflights);
                            returnflights.splice(i+1,1);
                            console.log("return_next",j,returnflights);
                        }
                    }
                }
                json_response = {
                    flightslist: flights,
                    returnlist: returnflights
                };
                res.send(json_response);

            });
        });
    }
};

// preferred_flights = function(coll, totalflights,preferred,i,source,destination,travel_date) {
//     coll.find({
//         source: source,
//         destination: destination,
//         Date: travel_date,
//         fligtName: preferred[i]
//     }).toArray(function (err, flights) {
//         if (err) throw (err);
//         totalflights = totalflights.concat(flights);
//         if (i < preferred.length) {
//             i++;
//             preferred_flights(coll,totalflights,preferred,i,source,destination,travel_date);
//         }
//         else {
//             return totalflights
//         }
//     });
// };
// /*---Method2 to find preferred flights-------*/
// exports.get_preferred_flights_oneway = function(req,res) {
//     console.log(Object.keys(req));
//     var preferred = req.body.preferred_flights;
//     console.log(req.body);
//     // var preferred = JSON.stringify(req.body.preferred_flights);
//     var source = req.body.source;
//     var destination = req.body.destination;
//     var travel_date = req.body.travel_date;
//
//     var i = 0;
//     // var preferred = JSON.parse(preferred);
//     // console.log(JSON.parse(preferred));
//     // while(i<preferred.length){
//     mongo.connect(keys.mongoURI, function () {
//         var totalflights = [];
//         for( var flight in preferred){
//             console.log("hgkhugkjhkjnkj",preferred[flight]);
//             var oneFlight = preferred[flight];
//         // for(var i=0; i < preferred.length; i++) {
//             console.log("Looking for preferred flights");
//             var coll = mongo.collection('simulatedFlightData');
//             coll.find({
//                 source: source,
//                 destination: destination,
//                 Date: travel_date,
//                 fligtName: oneFlight        //JSON.stringify(preferred[flight])
//             }).forEach(function (flights) {
//                 //if (err) throw (err);
//
//                 totalflights.push(JSON.stringify(flights));
//                 printarray(totalflights);
//                 console.log("khjgkhjgjhbkhjb",flights);
//
//                 // i++;
//                 // if (i < preferred.length) {
//                 //     i++;
//                 //     // preferredflights(totalflights, preferred, i, source, destination, travel_date);
//                 // }
//                 // else {
//                 //     findotherflights(totalflights);
//                 //     // return totalflights
//                 // }
//             });
//             //console.log("shhsgdhgsdhgdh...array:", totalflights);
//         }
//         printarray = function (totalflights) {
//             console.log("shhsgdhgsdhgdh...array:", totalflights);
//         }
//
//         // findotherflights(totalflights);
//     });
//     findotherflights = function (totalflights) {
//         mongo.connect(keys.mongoURI, function () {
//             var coll = mongo.collection('simulatedFlightData');
//             coll.find({source: source, destination: destination, Date: travel_date}).toArray(function (err, result) {
//                 console.log("inside find other flights");
//                 if (err) throw err;
//                 // console.log(result);
//                 // for (var j = 0; j <= totalflights.length; j++) {
//                 //     var i = result.indexOf(totalflights[j]);
//                 //     if (i != -1) {
//                 //         result.splice(i, 1);
//                 //     }
//                 // }
//                 json_response = {
//                     preferredflights: totalflights,
//                     otherflights: result
//                 };
//                 console.log("hi" + json_response);
//                 res.send(json_response);
//             });
//         });
//     };
// };
//     preferredflights(totalflights, preferred, i, source,destination,travel_date);
//     preferredflights = function(totalflights,preferred,i,source,destination,travel_date) {
//         mongo.connect(keys.mongoURI, function () {
//             console.log("Looking for preferred flights");
//             var coll = mongo.collection('simulatedFlightData');
//             coll.find({
//                 source: source,
//                 destination: destination,
//                 Date: travel_date,
//                 fligtName: preferred[i]
//             }).toArray(function (err, flights) {
//                 if (err) throw (err);
//                 totalflights = totalflights.concat(flights);
//                 if (i < preferred.length) {
//                     i++;
//                     preferredflights(totalflights, preferred, i, source, destination, travel_date);
//                 }
//                 else {
//                     findotherflights(totalflights);
//                     // return totalflights
//                 }
//             });
//         });
//     };
//     findotherflights = function (totalflights) {
//         mongo.connect(keys.mongoURI, function () {
//             coll.find({source: source, destination: destination, Date: travel_date}).toArray(function (err, result) {
//
//                 if (err) throw err;
//                 // console.log(result);
//                 for (var j = 0; j <= reply.length; j++) {
//                     var i = result.indexOf(totalflights[j]);
//                     if (i != -1) {
//                         result.splice(i, 1);
//                     }
//                 }
//                 json_response = {
//                     preferredflights: totalflights,
//                     otherflights: result
//                 };
//                 console.log("hi" + json_response);
//                 res.send(json_response);
//             });
//         });
//     }
// };

//
// exports.get_preferred_flights_oneway = function(req,res){
//     console.log(Object.keys(req));
//     var preferred = req.body.preferred_flights;
//     var source = req.body.source;
//     var destination = req.body.destination;
//     var travel_date = req.body.travel_date;
//     var totalflights = [];
//     var i=0;
//     mongo.connect(keys.mongoURI, function () {
//         var coll = mongo.collection('simulatedFlightData');
//         console.log("Inside preferred-oneway");
//         var reply = preferred_flights(totalflights, preferred, i, source,destination,travel_date);
//         coll.find({source:source, destination:destination, Date:travel_date}).toArray(function(err, result) {
//
//             if (err) throw err;
//             // console.log(result);
//             for(var j=0; j<=reply.length; j++) {
//                 var i = result.indexOf(reply[j]);
//                 if (i != -1) {
//                     array.splice(i, 1);
//                 }
//             }
//             json_response = {
//                 preferredflights: reply,
//                 otherflights: result
//             };
//             console.log("hi"+json_response);
//             res.send(json_response);
//         });
//     });
    // if (preferred !== null){
    //     for (var i = 0; i< preferred.length; i++){
    //         mongo.connect(keys.mongoURI, function () {
    //             var coll = mongo.collection('simulatedFlightData');
    //             coll.find({
    //                 source: source,
    //                 destination: destination,
    //                 Date: travel_date,
    //                 fligtName: preferred[i]
    //             }).toArray(function(error,flights) {
    //                 if (error) throw error;
    //                 getotherflights(flights);
    //             });
    //
    //         })
    //
    //             }
    // }


// };
// exports.get_preferred_flights_twoway = function(req,res) {
//     console.log(Object.keys(req));
//     var preferred = req.body.preferred_flights;
//     var source = req.body.source;
//     var destination = req.body.destination;
//     var travel_date = req.body.travel_date;
//     var return_date = req.body.return_date;
//     var totalflights = [];
//     var totalreturning =[];
//     // var i = 0;
//
//     // while(i<preferred.length){
//     mongo.connect(keys.mongoURI, function () {
//         for( var flight in preferred){
//             // for(var i=0; i < preferred.length; i++) {
//             console.log("Looking for preferred flights");
//             var coll = mongo.collection('simulatedFlightData');
//             coll.find({
//                 source: source,
//                 destination: destination,
//                 Date: travel_date,
//                 fligtName: JSON.stringify(preferred[flight])
//             }).forEach(function (err, flights) {
//                 if (err) throw (err);
//                 totalflights = totalflights.concat(flights);
//                 // i++;
//                 // if (i < preferred.length) {
//                 //     i++;
//                 //     // preferredflights(totalflights, preferred, i, source, destination, travel_date);
//                 // }
//                 // else {
//                 //     findotherflights(totalflights);
//                 //     // return totalflights
//                 // }
//             });
//         };
//         findotherflights(totalflights);
//     });
//     findotherflights = function (totalflights) {
//         mongo.connect(keys.mongoURI, function () {
//             var coll = mongo.collection('simulatedFlightData');
//             coll.find({
//                 source: source,
//                 destination: destination,
//                 Date: travel_date
//             }).toArray(function (err, otheroutgoing) {
//                 console.log("inside find other flights");
//                 if (err) throw err;
//                 findreturnflights(totalflights, otheroutgoing)
//                 // console.log(result);
//                 // for (var j = 0; j <= totalflights.length; j++) {
//                 //     var i = result.indexOf(totalflights[j]);
//                 //     if (i != -1) {
//                 //         result.splice(i, 1);
//                 //     }
//                 // }
//                 // json_response = {
//                 //     preferredflights: totalflights,
//                 //     otherflights: result
//                 // };
//                 // console.log("hi" + json_response);
//                 // res.send(json_response);
//             });
//         });
//     };
//     findreturnflights = function (totalflights, otheroutgoing) {
//         mongo.connect(keys.mongoURI, function () {
//             for( var flight in preferred){
//                 // for(var i=0; i < preferred.length; i++) {
//                 console.log("Looking for preferred flights");
//                 var coll = mongo.collection('simulatedFlightData');
//                 coll.find({
//                     source: destination,
//                     destination: source,
//                     Date: return_date,
//                     fligtName: JSON.stringify(preferred[flight])
//                 }).forEach(function (err, retflights) {
//                     if (err) throw (err);
//                     totalreturning = totalreturning.concat(retflights);
//                     // i++;
//                     // if (i < preferred.length) {
//                     //     i++;
//                     //     // preferredflights(totalflights, preferred, i, source, destination, travel_date);
//                     // }
//                     // else {
//                     //     findotherflights(totalflights);
//                     //     // return totalflights
//                     // }
//                 });
//             }
//             findotherreturning(totalflights, totalreturning,otheroutgoing );
//         });
//
//     };
//     findotherreturning = function(totalflights,totalreturning,otheroutgoing) {
//         mongo.connect(keys.mongoURI, function () {
//             for( var flight in preferred){
//                 // for(var i=0; i < preferred.length; i++) {
//                 console.log("Looking for preferred flights");
//                 var coll = mongo.collection('simulatedFlightData');
//                 coll.find({
//                     source: destination,
//                     destination: source,
//                     Date: return_date,
//                     // fligtName: preferred[flight]
//                 }).forEach(function (err, retflights) {
//                     if (err) throw (err);
//                     json_response = {
//                         preferred_outgoing: totalflights,
//                         other_outgoing: otheroutgoing,
//                         preferred_return: totalreturning,
//                         other_return: retflights
//                     };
//                     res.send(json_response);
//                     // totalreturning = totalreturning.concat(retflights);
//                     // i++;
//                     // if (i < preferred.length) {
//                     //     i++;
//                     //     // preferredflights(totalflights, preferred, i, source, destination, travel_date);
//                     // }
//                     // else {
//                     //     findotherflights(totalflights);
//                     //     // return totalflights
//                     // }
//                 });
//             }
//             // findotherreturning(totalflights, totalreturning,otheroutgoing );
//         });
//     }
// };
// exports.get_preferred_flights_twoway = function(req,res) {
//     console.log(Object.keys(req));
//     var preferred = req.body.preferred_flights;


// exports.show_preferred_flights = function(req, res) {
//

//     var totalflights = [];
//     var i = 0;
//     mongo.connect(keys.mongoURI, function () {
//         var coll = mongo.collection('simulatedFlightData');
//         var preferred_outgoing = preferred_flights(totalflights, preferred, i, source, destination, travel_date);
//         coll.find({source: source, destination: destination, Date: travel_date}).toArray(function (err, other_outgoing) {
//
//             if (err) throw err;
//             // console.log(result);
//             for (var j = 0; j <= reply.length; j++) {
//                 var i = other_outgoing.indexOf(preferred_outgoing[j]);
//                 if (i != -1) {
//                     other_outgoing.splice(i, 1);
//                 }
//             }
//             getreturnflights(preferred_outgoing,other_outgoing)
//             // json_response = {
//             //     preferredflights: reply,
//             //     otherflights: result
//             // };
//             // console.log("hi" + json_response);
//             // res.send(json_response);
//         });
//     });
//
//     getreturnflights = function(preferred_outgoing,other_outgoing) {
//         mongo.connect(keys.mongoURI, function () {
//             var coll = mongo.collection('simulatedFlightData');
//             var returnpreferred = preferred_flights(totalflights, preferred, i, destination, source, return_date);
//             coll.find({
//                 source: destination,
//                 destination: source,
//                 Date: return_date
//             }).toArray(function (error, otherreturnflights) {
//                 if (error) throw error;
//                 // console.log(result);
//                 json_response = {
//                     preferred_outgoing: preferred_outgoing,
//                     other_outgoing: other_outgoing,
//                     preferred_return: returnpreferred,
//                     other_return: otherreturnflights
//                 };
//                 res.send(json_response);
//
//             });
//         });
//     }
// };

//     var user_preferred_flight = request.body.preferred_flights;
//     for (i=0; i<user_preferred_flight.length;i++)
//     {
//         mongo.connect(keys.mongoURI, function () {
//             var coll = mongo.collection('simulatedFlightData');
//
//             coll.find({
//                 source: source,
//                 destination:destination,
//                 Date: travel_date,
//                 Date: return_date
//             })
//         })
// }



//
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host : 'localhost',
//     user : 'root',
//     password : 'root123',
//     database : 'login',
//     port : 3306
// });
