
//1-Usar métodos síncronos y asíncronos para 
//leer archivos
/*
var fs=require("fs");
console.log("Comienza la ejecución");

//método asíncrono readFile
fs.readFile("sample.txt",function(error,data){
	console.log("lectura asíncrona-contenidos del archivo: "+data);
});
console.log("estamos en ello");

//fs.readFileSync
console.log("lectura síncrona");
var contenido=fs.readFileSync("sample.txt");//,function(error,data){
console.log("contenidos del archivo: "+contenido);
console.log("archivo leído");*/


/* Lo que tengo que sacar claro de aquí es que hay dos tipos de peticiones la asíncrona que 
deja que el hilo principal siga su ejecución mientras se lee el archivo pero de que quiere
abrir el archivo y procesarlo el mensaje estamos en ello sale antes. Sin embargo la otra
síncrona antes de que ponga archivo leido va a salir el contenido bueno del archivo*/

//leer fichero de configuracion
/*
var fs=require("fs");
console.log("Inicio");
var contenido=fs.readFileSync("config2.json");

console.log("Contenidos "+contenido);
console.log("Letra numero " + contenido[10]); 
console.log("El nombre es " + contenido["username"]);

var config=JSON.parse(contenido);
console.log("config",config);
console.log("username=",config.username);
console.log("api_key=",config.api_key);
console.log("nombre=",config.nombre);
*/

/* AQUI TENGO UNA PREGUNTA: Lo que devuelve la función readFileSync es una cadenad de carácteres¿? -> En forma de buffer o cadena*/
/*Trasnsforma el contenido de la cadena en un arhivo JSON para poder de esta forma poder usarlo en config
como una especie de diccionario de datos*/


//2-escribir archivos
//hay dos métodos, síncrono y asíncrono
/*
var fs=require("fs");
console.log("Inicio");

//escritura síncrona
fs.writeFileSync("nuevo.txt","Hola mundo sinc");
console.log("fin");
*/
/*Hasta que no termina de crear al archivo no mostrará el mesnaje fin 
ya que al ser una escritura síncrono primero ha de realizar la escritura
para continuar con las líneas posteriores 
*/
//el método asíncrono se suele usar para escribir logs
/*
fs.writeFile("nuevoAsinc.txt","Hola mundo asinc",function(error){
	console.log("terminé de escribir el archivo asinc");
});
console.log("escribiendo el archivo");
*/
/*Aquí pasa todo lo contrario, debido a la escritura asíncrona el console log de escribiendo saldrá justo
después de el hilo mande a ejecutar el writeFile debido a que mientras crea el archivo y demas 
la impresión por pantalla es ejecutada. No se espera a que el write termine no como en el anterior*/

//watch archivos

var fs=require("fs");
console.log("inicio");
var config=JSON.parse(fs.readFileSync("config.json"));
console.log("Configuración inicial: ",config);
fs.watchFile("config.json",function(current,previous){
	console.log("Configuracion modificada");
	config=JSON.parse(fs.readFileSync("config.json"));
	console.log("nuevo archivo",config);
})

