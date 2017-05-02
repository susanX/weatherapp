$(function(){

  function updatePage(html){
    $("#tempOut").append(html);
  }

  function createHTML(res){
    var $source = $("#weather-template").html();
    var template = Handlebars.compile($source);
    var context = {T: res.SiteRep.DV.Location.Period[0].Rep[0].T, Pp: res.SiteRep.DV.Location.Period[0].Rep[0].Pp, Day: res.SiteRep.DV.Location.Period[0].value};
    var html = template(context);
    return html;
  }

function initialise(){
  $.ajax({
    method: 'GET',
    context: document.body,
     url: "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/350929/json/350929?res=3hourly&key=0944e2ad-fbc9-4be7-ae85-7139236c3834",
  }).done(function(response){
    console.log(response);
    //response.forEach(function(res){
      var html = createHTML(response);
      updatePage(html);
    //});
  }).fail(function(error){
    console.log(error);
  });
};

initialise();

function submitUser(user){
  $.ajax({
    method: 'POST',
    data: user,
    url: "/wusers",
  }).done(function(response){
    console.log(response);
  }).fail(function(error){
    console.log(error);
  });
}

var $form = $('form').eq(0);
console.log($form);
$form.on('submit.user', function($e){
  // collect data
  var name = $('[name="name"]').val();
  var email = $('[name="email"]').val();
  console.log('name', name);
  console.log('email', email);

  // create user data
  var user = {
    name: name,
    email: email,
  };

  //send to server
  submitUser(user);

  return false;
});


  //
  // function updatePage1(html){
  //   var $el = $("#tempOut");
  //   $el.append(html);
  // }

});
