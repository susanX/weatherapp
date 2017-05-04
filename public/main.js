$(function(){

  function updatePage(html){
    $("#tempOut").append(html);
  }

  function createHTML(res){
    var $source = $("#weather-template").html();
    var template = Handlebars.compile($source);
    var wtemperature = res.SiteRep.DV.Location.Period[0].Rep[0].T;
    var wrain = res.SiteRep.DV.Location.Period[0].Rep[0].Pp;
    var wtoday = res.SiteRep.DV.Location.Period[0].value;

    var context = {T: wtemperature,
                  Pp: wrain,
                 Day: wtoday};

 var tempNumber = Number(wtemperature);
 var rainNumber = Number(wrain);

 isNaN(tempNumber); //false
 isNaN(rainNumber); //false

 console.log("Is not a number? "+isNaN(tempNumber));
 console.log("Is not a number? "+isNaN(rainNumber));

 weatherClothes(tempNumber);
//call a function and pass the values above as parameters

  //  var context = {T: res.SiteRep.DV.Location.Period[0].Rep[0].T,
  //                Pp: res.SiteRep.DV.Location.Period[0].Rep[0].Pp,
  //               Day: res.SiteRep.DV.Location.Period[0].value};

    var html = template(context);
    return html;
    console.log(context);
  }

  // need else value to check 2 values
//                           10
  function weatherClothes(tempNumber){
    switch(true) {
      //leave 2r and 3r for rain
    case (tempNumber < -7):
        myImage("0r");
        break;
    case (tempNumber < -3):
        myImage("1r");
        break;
    case (tempNumber < 0):
        myImage("2r");
        break;
    case (tempNumber < 5):
        myImage("3r");
        break;
    case (tempNumber < 11):
        myImage("6");
        break;
    case (tempNumber < 14):
        myImage("7");
        break;
    case (tempNumber < 20):
        myImage("8");
    case (tempNumber < 25):
        myImage("9");
        break;
    case (tempNumber < 27):
        myImage("10");
        break;
    case (tempNumber < 30):
        myImage("10");
        break;
    default:
        myImage("9");
        break;
}
  }

  var myImage = function myImage(str) {
        var imagePlaceHolder = document.getElementById('imagePlaceHolder');
        imagePlaceHolder.innerHTML = "<img src='./images/" + str + ".gif'>";
        console.log(imagePlaceHolder.innerHTML);
    };


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
