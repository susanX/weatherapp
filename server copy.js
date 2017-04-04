var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // DB control program

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cars');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('DATABASE CONNECTED!!');
});

app.get('/cars', function(req, res){

  var cars = [{
    name: 'Ferarri'
  }, {
    name: 'Bugatti'
  }];

  return res.json(cars);

});

app.post('/cars', function(req, res){
  console.log(req.body);
  return res.json(req.body);
});

app.put('/cars', function(req, res){
  return res.send('PUT');
});

app.delete('/cars', function(req, res){
  return res.send('DELETE');
});

// app.listen(3333, function(){
//   console.log('App listening');
// });

// var express = require(' express');
// var app = express();
// app.get('/', function (req, res) {  
//   res.send(' Hallo Express!');  
// });  
// var server = app.listen( 3333, function () {  
//   var host = server.address;
// var port = server.address(). port;
// console.log(' I listen on http://% s:% s', host, port);
// });

//add http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/
//Add code to connect to the server and the database myproject:
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

//insert many method
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
//
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    db.close();
  });
});

//
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
//var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertDocuments(db, function() {
    findDocuments(db, function() {
      db.close();
    });
  });
});

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });      
}
