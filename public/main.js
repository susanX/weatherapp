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

  function createProfile1(res){
    var $source = $("#weather-template").html();
    var template = Handlebars.compile($source);
    var context = {T: res.SiteRep.DV.Location.Period[0].Rep[0].T}//, email: res.email};
    var html = template(context);
    updatePage1(html);
  }

  function updatePage1(html){
    var $el = $("#tempOut");
    $el.append(html);
  }

//#weather-template,#tempOut,temp

// Database section--------------------------------------------------------------------------------
var root = "http://localhost:3333/";

function callUsers(root, path){
  $.ajax({
    method: 'GET',
    context: document.body,
    url: root + path,
  }).done(function(response){
    response.forEach(function(res){
      createProfile(res);
    });
  }).fail(function(error){
    console.log(error);
  }).always(function(){
    console.log('Ajax from local host Happened...');
  });
}
callUsers(root, "wusers");

  function createProfile(res){
    var $source = $("#wusers-template").html();
    var template = Handlebars.compile($source);
    var context = {name: res.name, email: res.email};
    var html = template(context);

    updatePage(html);
  }

  function updatePage(html){
    var $el = $("#wusers");
    $el.append(html);
  }
