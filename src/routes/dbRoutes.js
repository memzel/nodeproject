var express = require('express');
var dbRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var eventsdata = [  
        {
        name:       'Event 1',
        description:'First event',
        date:       '2016.07.20',
        time:       '1:00 pm',
        duration:   '1 hour',
        location:   {
                    streetAddr: 'first street',
                    city:       'London',
                    state:      'England',
                    zip:        'W2 7GG',
                    lon:        0,
                    lat:        0,
        },
        capacity:   200,
        },
        {
        name:       'Event 2',
        description:'Second Event',
        date:       '2016.08.06',
        time:       '3:00 pm',
        duration:   '3 hours',
        location:   {
                    streetAddr: 'second street',
                    city:       'Leeds',
                    state:      'England',
                    zip:        'L2 0LL',
                    lon:        0,
                    lat:        0,
        },
        capacity:   50,
        },
        {
        name:       'Event 3',
        description:'Third Event',
        date:       '2016.09.03',
        time:       '1:00 pm',
        duration:   '2 hours',
        location:   {
                    streetAddr: 'third street',
                    city:       'Hull',
                    state:      'England',
                    zip:        'H9 4DD',
                    lon:        0,
                    lat:        0,
        },
        capacity:   500,
        },
        {
        name:       'Event 4',
        description:'Fourth Event',
        date:       '2016.10.17',
        time:       '5:00 pm',
        duration:   '2 hours',
        location:   {
                    streetAddr: 'fourth street',
                    city:       'Bath',
                    state:      'England',
                    zip:        'BA3 8HH',
                    lon:        0,
                    lat:        0,
        },
        capacity:   150,
        }
];


dbRouter.route('/AddEventData')
    .get(function(req,res){
        //res.send('Works');//works
        var url = 'mongodb://localhost:27017/eventsApp';
        mongodb.connect(url,function(err, db){
            //define collection, if it does nt exist it will be created
            var collection = db.collection('events');
            //insert data. insert = one insertMany=array. Once data is in run the callback
            collection.insertMany(eventsdata, function(err, results){
                res.send(results);
                db.close();
            });
        });
        
    });

module.exports = dbRouter;