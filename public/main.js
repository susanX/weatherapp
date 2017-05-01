
$(function(){

  $.ajax({
    url: 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/350929/json/350929?res=3hourly&key=0944e2ad-fbc9-4be7-ae85-7139236c3834',
  }).done(function(response){



    var $profileElement = $('#profile');

    var source = $("#profile-template").html();


    var templateFn = Handlebars.compile(source);

    var newHTML = templateFn(response.SiteRep.DV.Location.Period[0].Rep[0].T);

    var $out = $("#tempOut");
    $out.append(newHTML);
    

  }).fail(function(error){
    console.error('Error', error);
  }).always(function(){
    console.log('Ajax Happened again...');
  });
});



//////////////////




var root = "http://localhost:3333/";

function call(root, path){
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
    console.log('Ajax Happened...');
  });

}

call(root, "wusers");

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
