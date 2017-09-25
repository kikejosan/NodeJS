//visitar la documentacion nodejs.org

// Ejemplo 1
/*
var http=require("http");
console.log("Inicio");
var host="127.0.0.1";
var port=1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida: "+request.url);
	response.writeHead(200,{"Content-type":"text/plain"});
	response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});
*/
/*Lo único que hace es declarar un servidor y ponerlo a la escucha.
Cuando nosotros entremos con el navegador al mismo por consola nos mostrará que esta escuchando
tal número de veces como número de entradas a esa página.
Está bien para un primer acercamiento, en comparación con lo dado en distribuidos está mil veces mejor esto.*/



// Ejemplo 2
//Para este ejemplo hay que crear un directorio public (/node/public)
//e introducir en ese directorio un archivo html
/*
var http=require("http");
var fs=require("fs");
console.log("Inicio");
var host="127.0.0.1";
var port=1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida:"+request.url);
	fs.readFile("./public"+request.url,function(error,data){
		if(error){
			response.writeHead(404,{"Content-type":"text/plain"});
			response.end("Lo siento, página no encontrada");
		}
		else{
			response.writeHead(200,{"Content-type":"text/html"});
			response.end(data);
		}
	})
	//response.writeHead(200,{"Content-type":"text/plain"});
	//response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});
*/
/* Aquí lo que estamos usando es la coldtilla que damos en la URL en concreto le pasamos la dirección de un archivo HTML
para su lectura si por ejemplo ponemos 127.0.0.1:1337/public/hola.html o sin 
embargo ponemos 127.0.0.1:1337/public/otro/otro.html estamos abriendo en el navegador dos cosas distintas

En caso de que el archivo no se encuentre_no exista se pondrá por pantalla el error
Este ejemplo es útil ya que usamos el objeto request para usar diferentes elementos de la URL*/

//Ejemplo 3
//Leemos la configuración (host y puerto) desde el archivo json (config.json)
//prueba modificar la configuracion

var http=require("http");
var fs=require("fs");
console.log("Inicio");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;//"127.0.0.1";
var port=config.port;//1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida:"+request.url);
	fs.readFile("./public"+request.url,function(error,data){
		if(error){
			response.writeHead(404,{"Content-type":"text/plain"});
			response.end("Lo siento, página no encontrada");
		}
		else{
			response.writeHead(200,{"Content-type":"text/html"});
			response.end(data);
		}
	})
	//response.writeHead(200,{"Content-type":"text/plain"});
	//response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});

fs.watchFile("config.json",function(){
	config=JSON.parse(fs.readFileSync("config.json"));
	server.close();
	server.listen(config.port,config.host,function(){
		console.log("Escuchando "+config.host+":"+config.port)
	});
})
console.log("WATCH EJECUTÁNDOSE");
/*Se trata de dar de alta el servidor a través de la información guardada en un archivo json
es muy útil usar este tipo de técnica ya que hace mucho más dinámico el paso de la información.
Además destacar que permite una acción watch sobre el archivo de configuración 
de forma que sí cambiamos el contenido del fichero cerraremos el servidor previamente levantado
y lo crearemos con otro host o puerto distinto, según la modificación correspondiente*/


