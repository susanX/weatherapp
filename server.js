// The ordering here is really important try and keep to this structure
// 1--------------------------------------------
// Require all the things we need for the server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // DB control program
// --------------------------------------------
//....new
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

//var routes = require('./routes/index');
// var users = require('./routes/wusers');


//...new
// 2--------------------------------------------
// This is our middleware that the server will use
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//........
// app.use('/', routes);
// app.use('/wusers', wusers);

//..........
// --------------------------------------------


// 3--------------------------------------------
// Database setup
mongoose.Promise = global.Promise;
// Connect to the test database
mongoose.connect('mongodb://localhost/weatherapp/');
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
var wuserSchema = new Schema({
  name: String,
  email: String,
});

//Set the model for our databse to be the schema we created
var Wuser = mongoose.model('Wuser', wuserSchema);
// --------------------------------------------


// 4--------------------------------------------
// Routes

// Get all wusers form Database
app.get('/wusers/', function(req,res){
  // Mongoose function to get all wusers
  Wuser.find({}).exec(function(err,wusers){
    if(err){
      return res.status(500).send(error);
    }
    return res.status(200).send(wusers)
  })
});


// app.update('/wusers', function(req,res){
//    db.wusers.updateOne(
//       { "name" : "Mini" },
//       { $set: { "bhp" : 10 },
//     })
//       if(err){
//         return res.status(500).send(error);
//       }
//       return res.status(200).send(wusers)
//    });


// submitForms = function(){
//     document.forms["name"].submit();
//     document.forms["email"].submit();
// }

//POST --------------------------------------------------
app.post('/wusers',function(req, res){
  console.log(req.body);
  var body = "testemail@gmail.com";
  var wuserData = req.body;
  var newWuser = new Wuser(wuserData);
  newWuser.save(function(error, wuser){
    if(error){
      return res.status(500).send(error);
    }
    return res.status(201).send(wuser);//Set response status code, send its string repre as response body.
  })
});

//DELETE------------------------------------------------

app.delete("/wusers/:_id", function(req, res){

    var wusersIdForDeletion = req.params._id;

  Wuser.remove({ _id: wusersIdForDeletion }, function (err) {
    if(err) return handleError(err);
    // removed!
    res.sendStatus(204);
  });
});

//DELETE------------------------------------------------
//works in shell
//db.wusers.deleteOne( { "_id" : ObjectId("58f9036e925aca049c64c54d") } );

//works in shell
// db.wusers.updateOne(
// ...    { "name" : "Mini" },
// ...    { $set: { "bhp" : 8 } }
// ...   );

// app.patch('/wusers', function(req,res){
//   var wuserData = req.body;
//   var newWuser = new Wuser(wuserData);
//   //
//   db.wusers.updateOne(
//    { "name" : "Mini" },
//    { $set: newWuser  }
//   );
// });


// app.connect(url,function(err,db){
//   db.connect('Wuser').deleteOne(
//     {"_id":"58f9036e925aca049c64c54d"}
//   );
// });
// app.delete('/wusers',function(req,res){
//   Wuser.deleteOne(
//   {"_id" : "58e79b78256b4c33afd27e17"}
// );


// app.delete('/wusers', function (req, res) {
//   res.send('Got a DELETE request at /user')
//Send a response of various types.
// })
// app.delete = function(req,res){
//   res.send
//   app.remove({_id: req.params.id}, function(err, wuser) {
//     if(error) {
//       return res.status(500).send(error);
//     }
//     else {
//       console.log("ID deleted!");
//       return res.status(201).send(wuser)
//     }
//   });
// };

// /switch quest method new- goes to array email------------------------------------------------------------
var http = require('http');
var email = [];
var server = http.createServer(function(req, res){
  if ('/' == req.url) {
    switch (req.method) {
    case 'GET':
    show(res);
    break;
    case 'POST':
    add(req, res);
    break;
    default:
    badRequest(res);
    }
    } else {
    notFound(res);
    }
});


//add() function new -----------------
var qs = require('querystring');
function add(req, res) {
var body = '';
req.setEncoding('utf8');
req.on('data', function(chunk){ body += chunk });
req.on('end', function(){
var obj = qs.parse(body);
email.push(obj.item);
console.log(item);
show(res);
});
}
// end add() function -----------------


//form////------------




///switch quest method-------------------------------------------------------------

// --------------------------------------------
app.listen(3333, function(){
    console.log('Server is listening on port 3333');
});
// --------------------------------------------
