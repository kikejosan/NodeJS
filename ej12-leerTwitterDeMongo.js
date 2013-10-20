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
	tweetCol.find({},{"limit":5,"sort":{"_id":-1}},function(error,cursor){
		cursor.toArray(function(error,tweets){
			callback(tweets);
		})
	});
}