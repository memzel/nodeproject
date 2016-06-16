var express = require('express');
var eventRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

eventRouter.route('/')
    .get(function(req,res){
        var url = 'mongodb://localhost:27017/eventsApp';
        mongodb.connect(url,function(err, db){
            var collection = db.collection('events');
            collection.find({}).toArray(function(err, results){
                res.render('events',{
                    list:['first event','second event','third event'],
                    nav:[
                        {Link : 'Services', Text : 'Services'},
                        {Link : 'Portfolio',Text : 'Portfolio'},
                        {Link : 'About',    Text : 'About'},
                        {Link : 'Team',     Text : 'Team'},
                        {Link : 'Contact',  Text : 'Contact'},
                        {Link : 'Events',   Text : 'Events'}
                    ],
                    events : results
                })
            });
     
        });
    });
    

eventRouter.route('/:id')
    .get(function(req,res){
        var id = req.params.id;
        res.render('event',{
           list:['first event','second event','third event'],
            nav:[
                {Link : 'Services', Text : 'Services'},
                {Link : 'Portfolio',Text : 'Portfolio'},
                {Link : 'About',    Text : 'About'},
                {Link : 'Team',     Text : 'Team'},
                {Link : 'Contact',  Text : 'Contact'},
                {Link : 'Events',   Text : 'Events'}
            ],
            //needs to come from db
            events : eventsdata[id]
        });
    });
module.exports = eventRouter;