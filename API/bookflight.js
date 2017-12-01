const keys = require('../config/keys');
var mongo = require('./mongo');
/*-------------------------------Working-------------------------------*/
console.log("inside book_flights");
exports.post_user_flight = function(req, res) {     //Service to post user and flights data from flightssearch.html

    var save_data = {
        username: req.body.uername,
        contact: req.body.contact,
        duration: req.body.duration,
        costFlight: req.body.price,
        destination: req.body.destination,
        source: req.body.source,
        fligtName: req.body.flightname,
        srcIata: req.body.srcIata,
        time: req.body.time,
        Date: req.body.date,
        destIata: req.body.destIata,
        Day: req.body.Day
    };
    mongo.connect(keys.mongoURI, function () {
        var coll = mongo.collection('Bookings');
        console.log("u r inserting data to bookings ");
        coll.insert(save_data);
    });
};

exports.get_user_flight= function (req,res) {       //Service to receive user bookings, This service will be used by
                                                    // Current Bookings, History (navbar tabs) and confirmation page
    mongo.connect(keys.mongoURI, function() {
        var coll = mongo.collection('Bookings');
        coll.find({
            username: req.body.uername,
            fligtName: req.body.flightname,
            Date: req.body.date
        }).forEach(function (doc) {
            res.send(doc);
        });
    });
};
