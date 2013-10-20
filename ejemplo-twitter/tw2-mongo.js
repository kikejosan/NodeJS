//Conectar a Twitter con el API de Twitter
var	twitter=require("ntwitter");
var twit=new twitter({
	consumer_key:"ieOAbjJALLbJItedFGSnXA",
	consumer_secret:"tNjmERYSjqcPfbn0VPOf2XQzlRdI3FgLqO3BbZcu7w",
	access_token_key:"258725479-KUiuNk8H7MhrAMS64HvPQuTKevAYjgIkzDSlQT0b",
	access_token_secret:"yrXFkithnd3qywGynx4XWQYLo21s4Xhjqma65gaNws"
});

var mongo=require("mongodb");
var host="127.0.0.1";
var port=mongo.Connection.DEFAULT_PORT;
var db=new mongo.Db("ntui1",new mongo.Server(host,port,{}));

var tweetCol;

db.open(function(error){
  console.log("Conectado a la base de datos "+host+" "+port);

  db.collection("tweet",function(error,col){
    console.log("Tenemos la colección");
    tweetCol=col;
  });
});

twit.stream('user', {track:'bieber'}, function(stream) {
  stream.on('data', function (data) {
		//console.log(data.text);
    var tweet=data;    
    tweetCol.insert(tweet,function(error){
            if(error){
              console.log("Hubo un error");
            }
            else{
              console.log("Elemento insertado");
            }
          });

  });
  stream.on('end', function (response) {
    // Handle a disconnection
  });
  stream.on('destroy', function (response) {
    // Handle a 'silent' disconnection from Twitter, no end/error event fired
  });
  // Disconnect stream after five seconds
  setTimeout(stream.destroy, 5000);
});
