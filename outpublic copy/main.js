function callData(){
  $.ajax({
    method: 'GET',
    context: document.body,
     url: "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/350929/json/350929?res=3hourly&key=0944e2ad-fbc9-4be7-ae85-7139236c3834",
  }).done(function(response){
    //response.forEach(function(res){
      createProfile1(response);
    //});
  }).fail(function(error){
    console.log(error);
  }).always(function(){
    console.log('Ajax data from local host Happened...');
  });
};
callData();


  function createProfile1(res){
    var $source = $("#weather-template").html();
    var template = Handlebars.compile($source);
    var context = {T: res.SiteRep.DV.Location.Period[0].Rep[0].T, Pp: res.SiteRep.DV.Location.Period[0].Rep[0].Pp, Day: res.SiteRep.DV.Location.Period[0].value};
    var html = template(context);
    updatePage1(html);
  }

  function updatePage1(html){
    var $el = $("#tempOut");
    $el.append(html);
  }

  ////...................................................http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

//#weather-template,#tempOut,temp

// Database section--------------------------------------------------------------------------------
// var root = "http://localhost:3333/";
//
// function callUsers(root, path){
//   $.ajax({
//     method: 'GET',
//     context: document.body,
//     url: root + path,
//   }).done(function(response){
//     response.forEach(function(res){
//       createProfile(res);
//     });
//   }).fail(function(error){
//     console.log(error);
//   }).always(function(){
//     console.log('Ajax from local host Happened...');
//   });
// }
// callUsers(root, "wusers");
//
//   function createProfile(res){
//     var $source = $("#wusers-template").html();
//     var template = Handlebars.compile($source);
//     var context = {name: res.name, email: res.email};
//     var html = template(context);
//
//     updatePage(html);
//   }
//
//   function updatePage(html){
//     var $el = $("#wusers");
//     $el.append(html);
//   }


  // function myFunction() {
  //     document.getElementById("mySubmit").disabled = true;
  // }


//form---------------------------------------------------------------------------------------------





// (window.onload = function(){
//   var form      = document.getElementById('newPwd');  // The form
//   var password  = document.getElementById('pwd');     // Password input
//   var submit    = document.getElementById('submit');  // Submit button
//
//   var submitted = false;                            // Has form been submitted?
//   submit.disabled = true;                           // Disable submit button
//   submit.className = 'disabled';                    // Style submit button
//   console.log(submit.className);
//
//   // On input: Check whether or not to enable the submit button
//   addEvent(password, 'input', function(e) {         // On input of password
//     var target = e.target || e.srcElement;          // Target of event
//     submit.disabled = submitted || !target.value;   // Set disabled property
//     // If form has been submitted or pwd has no value set CSS to disabled
//     submit.className = (submitted || !target.value) ? 'disabled' : 'enabled';
//   });
//
//   // On submit: Disable the form so it cannot be submitted again
//   addEvent(form, 'submit', function(e) {            // On submit
//     if (submit.disabled || submitted) {             // If disabled OR sent
//       e.preventDefault();                           // Stop form submitting
//       return;                                       // Stop processing function
//     }                                               // Otherwise continue...
//     submit.disabled = true;                         // Disable submit button
//     submitted = true;                               // Update submitted var
//     submit.className = 'disabled';                  // Update style
//
// if (submitted === true){
//   postForm(wuserData, newWuser)
// }
//     // Demo purposes only: What would have been sent & show submit is disabled
//     e.preventDefault();                             // Stop form submitting
//     alert('Password is ' + password.value);         // Show the text
//   });
// }());
//
// //call the post function
// function postForm(wuserData, newWuser){
//
//   app.post('/wusers',function(req, res){
//     var wuserData = req.body;
//     var newWuser = new Wuser(wuserData);
//     newWuser.save(function(error, wuser){
//       if(error){
//         return res.status(500).send(error);
//       }
//       return res.status(201).send(wuser);//Set response status code, send its string repre as response body.
//     })
//   });
//
//
// }



//helper function to add an event listerner
// Helper function to add an event listener
//the in operator serches an array
// function addEvent (el, event, callback) {
//   if ('addEventListener' in el) {                  // If addEventListener works
//     el.addEventListener(event, callback, false);   // Use it
//   } else {                                         // Otherwise
//     el['e' + event + callback] = callback;         // CreateIE fallback
//     el[event + callback] = function () {
//       el['e' + event + callback](window.event);
//     };
//     el.attachEvent('on' + event, el[event + callback]);
//   }
// }

// function addEvent(el, event, callback){
//   if ('addEventListener'in el) {
//     el.addEventListener(event, callback, false);
//   } else {
//     el['e' + event + callback] = callback;
//     el[event + callback] = function(){
//       el['e'+ event + callback](window.event);
//     };
//     el.attachEvent( "on" + event, el[event + callback] );
//   }
// };
// (function(){
//   var form = document.getElementById('wuserForm');       // Get form element
//
//   addEvent(form, 'submit', function(e) {             // When user submits form
//     e.preventDefault();                              // Stop it being sent
//     var elements = this.elements;                    // Get all form elements
//     var username = elements.username.value;          // Select username entered
//     var msg      = 'Welcome ' + wusername;            // Create welcome message
//     document.getElementById('main').textContent = msg; // Write welcome message
//   });
// }());

// (function(){
//   var form = document.getElementById("wuserForm");
//   addEvent(form,"submit",function(e){
//     e.preventDefault();
//     var elements = this.elements;
//     var wusername = elements.wusername.value;
//     var msg = 'Welcome ' + wusername;
//     document.getElementById('main').textContent = msg;
//   });
// }())

















//reserve innerhtml
// var wpath = "SiteRep.DV.Location.Period[0].Rep[0].T";
//   $.ajax({
//     method: 'GET',
//     context: document.body,
//     url: "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/350929/json/350929?res=3hourly&key=0944e2ad-fbc9-4be7-ae85-7139236c3834",
// }).done(function(response){
//
//   //console.log("Path, Temperature today: "+ response.path+ "˚C");
// //   console.log("Temperature today: "+ response.SiteRep.DV.Location.Period[0].Rep[0].T + "˚C");
// //   var input = "";
// // input = "Temperature today: "+ response.SiteRep.DV.Location.Period[0].Rep[0].T + "˚C"
// // console.log("input "+input);
//
//
// // document.getElementById("tempOut").innerHTML = input;
//   response.forEach(function(res){
//
//   });
//   createProfile1(res);
//   }).fail(function(error){
//     console.log(error);
//   }).always(function(){
//     console.log('Ajax Data Happened...');
//   });
