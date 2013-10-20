//Para poder hacer este ejemplo hay que obtener 4 claves en dev.twitter.com
// 1- consumer key
// 2- secret key
// 3- token access
// 4- secret access token

var OAuth = require('OAuth');
var oauth = new OAuth.OAuth(
      'https://api.twitter.com/oauth/request_token',
      'https://api.twitter.com/oauth/access_token',
      'ieOAbjJALLbJItedFGSnXA',
      'tNjmERYSjqcPfbn0VPOf2XQzlRdI3FgLqO3BbZcu7w',
      '1.0A',
      null,
      'HMAC-SHA1'
    );
/*
var mongo=require("mongodb");
var host="127.0.0.1";
var port=mongo.Connection.DEFAULT_PORT;
var db=new mongo.Db("prueba",new mongo.Server(host,port,{}));

var tweetCol;

db.open(function(error){
  console.log("Conectado a la base de datos "+host+" "+port);

  db.collection("tweet",function(error,col){
    console.log("Tenemos la colección");
    tweetCol=col;
  });
});
*/

//ejemplo stream
/*
var request = oauth.post(
  "https://stream.twitter.com/1.1/statuses/filter.json?track=bieber",
 '258725479-KUiuNk8H7MhrAMS64HvPQuTKevAYjgIkzDSlQT0b', 
 'yrXFkithnd3qywGynx4XWQYLo21s4Xhjqma65gaNws'
 );
request.addListener('response', function (response) {
  response.setEncoding('utf8');
  response.addListener('data', function (chunk) {
    console.log(chunk);
  });
  response.addListener('end', function () {
    console.log('--- END ---');
  });
});
request.end();
*/

//ejemplo get
/*
oauth.get(
      //ejemplo1: trends
      //'https://api.twitter.com/1.1/trends/place.json?id=23424977',
      //ejemplo2: mentions:timeline
      //'https://api.twitter.com/1.1/statuses/mentions_timeline.json?count=2&since_id=14927799',
      //ejemplo 3: obtener los últimos 4 twits por screen_name
      'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=nodejs&count=4',
      '258725479-KUiuNk8H7MhrAMS64HvPQuTKevAYjgIkzDSlQT0b', 
      //you can get it at dev.twitter.com for your own apps
      'yrXFkithnd3qywGynx4XWQYLo21s4Xhjqma65gaNws', 
      //you can get it at dev.twitter.com for your own apps
      function (e, data, res){
        var twit;
        if (e) console.error(e);  
        twit=JSON.parse(data);
        twit.forEach(function(el){
          //console.log(el.text);
          tweetCol.insert(el,function(error){
            if(error){
              console.log("Hubo un error");
            }
            else{
              console.log("Elemento insertado");
            }
          });      
        });
        //console.log(require('util').inspect(data));
        //done();      
    });
*/




    
