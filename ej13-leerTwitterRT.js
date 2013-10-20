var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

app.get("/",function(request,response){
	var contenido=fs.readFileSync("./template.html");
	getTweets(function(tweets){
		var ul="";
		console.log("Obtener tweets");
		tweets.forEach(function(tweet){
			ul+="<li><strong>"+tweet.user.screen_name+": </strong>"+tweet.text +"</li>";
		});
		contenido=contenido.toString("utf8").replace("{{INITIAL_TWEETS}}",ul);
		response.setHeader("Content-type","text/html");
		response.send(contenido);
	})
});
app.listen(port,host);

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

function getTweets(callback)
{
	tweetCol.find({},{"limit":10,"sort":{"_id":-1}},function(error,cursor){
		cursor.toArray(function(error,tweets){
			callback(tweets);
		})
	});
};

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

var request = oauth.post(
  "https://stream.twitter.com/1.1/statuses/filter.json?track=bieber",
 '258725479-KUiuNk8H7MhrAMS64HvPQuTKevAYjgIkzDSlQT0b', 
 'yrXFkithnd3qywGynx4XWQYLo21s4Xhjqma65gaNws'
 );
request.addListener('response', function (response) {
  response.setEncoding('utf8');
  response.addListener('data', function (chunk) {
    var tweet=JSON.parse(chunk);
    if (tweet)
    {
	    tweetCol.insert(tweet,function(error){
            if(error){
              console.log("Hubo un error");
            }
            else{
              console.log("Elemento insertado");
            }
          });
    //console.log(tweet);
	}
  });
  response.addListener('end', function () {
    console.log('--- END ---');
  });
});
request.end();