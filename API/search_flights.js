const keys = require('../config/keys');
var mongo = require('./mongo');
/*-------------------------------Working-------------------------------*/
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
            console.log("hi"+json_response);
            res.send(json_response);
        });

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
            // console.log(result);
            // json_response = {
            //     resResult: result
            // };
            //res.send(json_response);
            get_returnflights(result);
        });
    });

    get_returnflights = function(result) {
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
                json_response = {
                    flightslist: result,
                    returnlist: returnflights
                };
                res.send(json_response);

            });
        });
    }
};


// exports.show_preferred_flights = function(req, res) {
//
//     var source = req.body.source;
//     var destination = req.body.destination;
//     var travel_date = req.body.travel_date;
//     var return_date = req.body.return_date;
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