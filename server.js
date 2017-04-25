// The ordering here is really important try and keep to this structure
// 1--------------------------------------------
// Require all the things we need for the server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // DB control program
// --------------------------------------------


// 2--------------------------------------------
// This is our middleware that the server will use
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// --------------------------------------------


// 3--------------------------------------------
// Database setup
mongoose.Promise = global.Promise;
// Connect to the test database
mongoose.connect('mongodb://localhost/cars');
// Assign the connect to db so we can use it later
var db = mongoose.connection;
// If databse show this error
db.on('error', console.error.bind(console, 'connection error:'));
// When datbase is accessed run the console log
db.once('open', function() {
  // we're connected!
  console.log('DATABASE CONNECTED!!!!!');
});
// Declare a schema object to use later
var Schema = mongoose.Schema;
//Registering a schema
var carSchema = new Schema({
  name: String,
  bhp: Number,
});

//Set the model for our databse to be the schema we created
var Car = mongoose.model('Car', carSchema);
// --------------------------------------------


// 4--------------------------------------------
// Routes

// Get all cars form Database
app.get('/cars/', function(req,res){
  // Mongoose function to get all cars
  Car.find({}).exec(function(err,cars){
    if(err){
      return res.status(500).send(error);
    }
    return res.status(200).send(cars)
  })
});


// app.update('/cars', function(req,res){
//    db.cars.updateOne(
//       { "name" : "Mini" },
//       { $set: { "bhp" : 10 },
//     })
//       if(err){
//         return res.status(500).send(error);
//       }
//       return res.status(200).send(cars)
//    });

//Post a new car to the database
app.post('/cars',function(req, res){
  var carData = req.body;
  var newCar = new Car(carData);
  newCar.save(function(error, car){
    if(error){
      return res.status(500).send(error);
    }
    return res.status(201).send(car);//Set response status code, send its string repre as response body.
  })
});

//update

//Removing a document

// Car.findById('58f9036e925aca049c64c54d', function(err,Car){
//   Car.remove();
// });

// delete the car with this id )

  //_id = 58e400c25cc10bd443d1d797;
// app.delete('/cars/:_id' ,function(req, res) {
//     Car.remove({
//
//         _id: req.params._id,
//     }, function(err, car) {
//         if (err)
//             res.send(err);
//
//         res.json({ message: 'Successfully deleted' });
//     });
// });
//from slides
app.delete("/cars/:_id", function(req, res){
    var carsIdForDeletion = req.params._id;

  Car.remove({ _id: carsIdForDeletion }, function (err) {
    if(err) return handleError(err);
    // removed!
    res.sendStatus(204);
  });
});
/////

//works in shell
//db.cars.deleteOne( { "_id" : ObjectId("58f9036e925aca049c64c54d") } );

//works in shell
// db.cars.updateOne(
// ...    { "name" : "Mini" },
// ...    { $set: { "bhp" : 8 } }
// ...   );

// app.patch('/cars', function(req,res){
//   var carData = req.body;
//   var newCar = new Car(carData);
//   //
//   db.cars.updateOne(
//    { "name" : "Mini" },
//    { $set: newCar  }
//   );
// });


// app.connect(url,function(err,db){
//   db.connect('Car').deleteOne(
//     {"_id":"58f9036e925aca049c64c54d"}
//   );
// });
// app.delete('/cars',function(req,res){
//   Car.deleteOne(
//   {"_id" : "58e79b78256b4c33afd27e17"}
// );


// app.delete('/cars', function (req, res) {
//   res.send('Got a DELETE request at /user')
//Send a response of various types.
// })
// app.delete = function(req,res){
//   res.send
//   app.remove({_id: req.params.id}, function(err, car) {
//     if(error) {
//       return res.status(500).send(error);
//     }
//     else {
//       console.log("ID deleted!");
//       return res.status(201).send(car)
//     }
//   });
// };



// --------------------------------------------
app.listen(3333, function(){
    console.log('Server is listening on port 3333');
});
// --------------------------------------------
