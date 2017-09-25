//1- primer ejemplo con express
/*
var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

//app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});
app.get("/hola2", function(request,response){
	response.send("otroooo");
});
console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);
*/
/*En este caso lanzmos un servidor de expres
Evidentemente el código es diferente a como podría ser anteriormente en servidor.js,
ya que lo hacemos mediante el servicio de expres.
NO ENTIENDO. app.use_____ creo que es poner cual será el directorio raiz.
El funcionamiento es el mismo que el anterior pero con expres.

*/
//

//2- Devolver la cadena indicada en la url con
//este formato /hola/juanito
/*
var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 

//app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});
app.get("/hola/:text",function(request,response){
	console.log(request.params)
	response.send("Hola "+request.params.text);
});
//app.get("/hola/text",function(request,response){
//	response.send("Hola "+request.params.text);
//});//el selector es muy importante 
console.log("Servidor escuchando en "+host+":"+port);
app.listen(port,host);
*/
/*Cuando usamos este código imprimeremos lo que queramos siempre y cuando URL indique /hola/textocualquiera
de esta forma "textocualquiera" será identificado como un argumento string y lo imprimirá
Es interesante como actúa request.params.text ya que es el que coge el argumento en cuestión como si fuera un diccionario de datos
{ text: 'pepe' } primera llamada
{ text: 'pepe reodriguez llanos' }	segunda llamada 
estos son los diccionarios obtenidos por params.text
 ¿? COMO MANDO DOS ARGUMENTOS ¿?
*/





//3-Devolver los valores según un parámetro indicado
//en la url
//Puedes utilizar console.log para que el servidor muestre mensajes
//Observa que el servidor acepta tres rutas / /hola/pepito y /user/numero

var fs=require("fs");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;
var port=config.port;
var exp=require("express");
var app=exp(); 

//app.use(app.router);
app.use(exp.static(__dirname + "/public"));

app.get("/",function(request,response){
	response.send("hola");
});
app.get("/hola/:text",function(request,response){
	response.send("Hola "+request.params.text);
});
var users ={
	"1":{
		"name":"Pepe",
		"cuenta":"@pepe"
	},
	"2":{
		"name":"Juan Perez",
		"cuenta":"@juan"
	},
	"kikejosan":{
		"name":"Enrique Brazález Segovia",
		"cuenta":"enriquebs96@gmail.com"
	}
}
app.get("/user/:id",function(request,response){
	var user=users[request.params.id];
	console.log(users[request.params.id]);

	if(user){
		response.send("Usuario: "+user.name+" cuenta: "+user.cuenta);
	}
	else{
		response.send("usuario no existe");
	}
	response.send
})
app.listen(port,host);
/*Ahora en lugar de jugar con los atributos valor jugamos con las claves
de tal forma que teniendo un archivo o diccionario (como es en el caso de este ejemplo)
podemos comparar lo que le pasamos por parametro y ver si efectivamente le pasamos una clave
que esté almacenada en el sistema. 
He añadido un usuario mas para probarlo
*/